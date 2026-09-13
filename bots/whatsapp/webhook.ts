import express, { type Request, type Response } from 'express';
import {
  createLeadState,
  formatLeadForStaff,
  isComplete,
  LOCATIONS,
  PROJECT_TYPES,
  SERVICES,
  type BotLocale,
  type LeadState,
  type LocationSlug,
  type ProjectTypeSlug,
  type ServiceSlug,
} from '../shared/flow';
import { botStrings, LANGUAGE_BUTTONS, LANGUAGE_PROMPT } from '../shared/i18n';
import { getMediaUrl, sendButtons, sendList, sendText, type ListSection } from './graph-api';

/** See bots/telegram/bot.ts for the same note on swapping this for shared storage in production. */
const sessions = new Map<string, LeadState>();

function getSession(waId: string): LeadState {
  const existing = sessions.get(waId);
  if (existing) return existing;
  const fresh = createLeadState('whatsapp', waId);
  sessions.set(waId, fresh);
  return fresh;
}

function t(state: LeadState) {
  return botStrings[state.locale ?? 'en'];
}

const SERVICE_CATEGORY_TITLE: Record<string, string> = {
  design: 'Design',
  build: 'Build',
  management: 'Management',
  specialist: 'Specialist',
};

// Kept in sync with src/content/services categories, without importing the Astro site's TS
// (this bots/ package is intentionally standalone — see bots/README.md).
const SERVICE_CATEGORIES: Record<ServiceSlug, keyof typeof SERVICE_CATEGORY_TITLE> = {
  architecture: 'design',
  'villa-design': 'design',
  'interior-design': 'design',
  construction: 'build',
  renovation: 'build',
  'project-management': 'management',
  'construction-supervision': 'management',
  'technical-supervision': 'management',
  'landscape-design': 'design',
  'permits-planning': 'management',
  'turnkey-projects': 'management',
  'eco-construction': 'specialist',
  'concrete-construction': 'specialist',
};

async function askLanguage(waId: string) {
  await sendText(
    waId,
    `${LANGUAGE_PROMPT}\n\n${LANGUAGE_BUTTONS.map((b, i) => `${i + 1}. ${b.label}`).join('\n')}\n\nReply with a number.`,
  );
}

async function askService(waId: string, state: LeadState) {
  const s = t(state);
  const sections: ListSection[] = (['design', 'build', 'management', 'specialist'] as const).map((cat) => ({
    title: SERVICE_CATEGORY_TITLE[cat],
    rows: SERVICES.filter((slug) => SERVICE_CATEGORIES[slug] === cat).map((slug) => ({ id: `service:${slug}`, title: s.services[slug] })),
  }));
  await sendList(waId, s.prompts.service, 'Choose', sections);
}

async function askLocation(waId: string, state: LeadState) {
  const s = t(state);
  const sections: ListSection[] = [{ title: 'Location', rows: LOCATIONS.map((slug) => ({ id: `location:${slug}`, title: s.locations[slug] })) }];
  await sendList(waId, s.prompts.location, 'Choose', sections);
}

async function askProjectType(waId: string, state: LeadState) {
  const s = t(state);
  const sections: ListSection[] = [
    { title: 'Project type', rows: PROJECT_TYPES.map((slug) => ({ id: `ptype:${slug}`, title: s.projectTypes[slug] })) },
  ];
  await sendList(waId, s.prompts.projectType, 'Choose', sections);
}

async function askContactMethod(waId: string, state: LeadState) {
  const s = t(state);
  await sendButtons(waId, s.prompts.contactMethod, [
    { id: 'method:whatsapp', title: s.contactMethods.whatsapp },
    { id: 'method:email', title: s.contactMethods.email },
    { id: 'method:phone', title: s.contactMethods.phone },
  ]);
}

function reviewSummary(state: LeadState): string {
  const s = t(state);
  const service = state.service ? s.services[state.service] : '—';
  const location = state.location ? s.locations[state.location] : '—';
  const projectType = state.projectType ? s.projectTypes[state.projectType] : '—';
  const contactMethod = state.contactMethod ? s.contactMethods[state.contactMethod] : '—';
  return [
    s.prompts.reviewIntro,
    '',
    `• ${s.prompts.service} ${service}`,
    `• ${s.prompts.location} ${location}`,
    `• ${s.prompts.projectType} ${projectType}`,
    `• ${s.prompts.description} ${state.description ?? '—'}`,
    `• ${s.prompts.budget} ${state.budget ?? '—'}`,
    `• ${s.prompts.timeline} ${state.timeline ?? '—'}`,
    `• Attachments: ${state.attachments.length}`,
    `• ${s.prompts.contactName} ${state.contactName ?? '—'}`,
    `• ${s.prompts.contactMethod} ${contactMethod}`,
    `• ${s.prompts.contactValue} ${state.contactValue ?? '—'}`,
  ].join('\n');
}

async function submitLead(state: LeadState) {
  const staffChatId = process.env.WHATSAPP_STAFF_FORWARD_CHAT_ID; // forwarded via the Telegram staff chat, see README
  state.submittedAt = new Date().toISOString();
  const summary = formatLeadForStaff(state);
  if (staffChatId && process.env.TELEGRAM_BOT_TOKEN) {
    await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ chat_id: staffChatId, text: summary }),
    });
  } else {
    console.log('WhatsApp lead submitted (no staff forwarding configured):\n', summary);
  }
}

interface IncomingMessage {
  from: string;
  type: string;
  text?: { body: string };
  interactive?: { list_reply?: { id: string }; button_reply?: { id: string } };
  image?: { id: string; caption?: string };
  document?: { id: string; caption?: string };
}

async function handleMessage(msg: IncomingMessage) {
  const waId = msg.from;
  const state = getSession(waId);
  const s = t(state);

  const choiceId = msg.interactive?.list_reply?.id ?? msg.interactive?.button_reply?.id;
  const text = msg.text?.body?.trim();

  if (state.step === 'language') {
    let chosen: BotLocale | undefined;
    if (choiceId?.startsWith('lang:')) chosen = choiceId.split(':')[1] as BotLocale;
    else if (text && /^[1-4]$/.test(text)) chosen = LANGUAGE_BUTTONS[Number(text) - 1]?.locale;
    if (!chosen) return askLanguage(waId);
    state.locale = chosen;
    state.step = 'service';
    return askService(waId, state);
  }

  if (state.step === 'service') {
    const slug = choiceId?.startsWith('service:') ? (choiceId.split(':')[1] as ServiceSlug) : undefined;
    if (!slug || !(SERVICES as readonly string[]).includes(slug)) return askService(waId, state);
    state.service = slug;
    state.step = 'location';
    return askLocation(waId, state);
  }

  if (state.step === 'location') {
    const slug = choiceId?.startsWith('location:') ? (choiceId.split(':')[1] as LocationSlug) : undefined;
    if (!slug || !(LOCATIONS as readonly string[]).includes(slug)) return askLocation(waId, state);
    state.location = slug;
    state.step = 'projectType';
    return askProjectType(waId, state);
  }

  if (state.step === 'projectType') {
    const slug = choiceId?.startsWith('ptype:') ? (choiceId.split(':')[1] as ProjectTypeSlug) : undefined;
    if (!slug || !(PROJECT_TYPES as readonly string[]).includes(slug)) return askProjectType(waId, state);
    state.projectType = slug;
    state.step = 'description';
    return sendText(waId, s.prompts.description);
  }

  if (state.step === 'description') {
    if (!text) return sendText(waId, s.prompts.description);
    state.description = text;
    state.step = 'budget';
    return sendText(waId, s.prompts.budget);
  }

  if (state.step === 'budget') {
    state.budget = text && !/^(skip|пропустить|ข้าม|דלג)$/i.test(text) ? text : undefined;
    state.step = 'timeline';
    return sendText(waId, s.prompts.timeline);
  }

  if (state.step === 'timeline') {
    state.timeline = text && !/^(skip|пропустить|ข้าม|דלג)$/i.test(text) ? text : undefined;
    state.step = 'attachments';
    return sendText(waId, s.prompts.attachments);
  }

  if (state.step === 'attachments') {
    if (msg.image || msg.document) {
      const mediaId = msg.image?.id ?? msg.document?.id;
      if (mediaId) {
        const url = await getMediaUrl(mediaId);
        state.attachments.push({ fileId: url ?? mediaId, kind: msg.image ? 'photo' : 'document', caption: msg.image?.caption ?? msg.document?.caption });
      }
      return sendText(waId, `📎 ${state.attachments.length} attachment(s) received. Send more, or type "skip" to continue.`);
    }
    if (text && /^(skip|done|пропустить|готово|ข้าม|เสร็จ|דלג|סיום)$/i.test(text)) {
      state.step = 'contactName';
      return sendText(waId, s.prompts.contactName);
    }
    return sendText(waId, s.prompts.attachments);
  }

  if (state.step === 'contactName') {
    if (!text) return sendText(waId, s.prompts.contactName);
    state.contactName = text;
    state.step = 'contactMethod';
    return askContactMethod(waId, state);
  }

  if (state.step === 'contactMethod') {
    const method = choiceId?.startsWith('method:') ? choiceId.split(':')[1] : undefined;
    if (!method) return askContactMethod(waId, state);
    state.contactMethod = method as LeadState['contactMethod'];
    state.step = 'contactValue';
    return sendText(waId, s.prompts.contactValue);
  }

  if (state.step === 'contactValue') {
    if (!text) return sendText(waId, s.prompts.contactValue);
    state.contactValue = text;
    state.step = 'review';
    return sendText(waId, reviewSummary(state));
  }

  if (state.step === 'review') {
    const lower = text?.toLowerCase() ?? '';
    if (/^(submit|отправить|ส่ง|שלח)$/i.test(lower)) {
      if (!isComplete(state)) return sendText(waId, s.invalidChoice);
      await submitLead(state);
      await sendText(waId, s.submitted);
      state.step = 'done';
      return;
    }
    if (/^(restart|заново|เริ่มใหม่|התחל מחדש)$/i.test(lower)) {
      const locale = state.locale;
      sessions.delete(waId);
      const fresh = getSession(waId);
      fresh.locale = locale;
      if (locale) {
        await sendText(waId, botStrings[locale].restarted);
        return askService(waId, fresh);
      }
      return askLanguage(waId);
    }
    if (/^(edit|изменить|แก้ไข|ערוך)$/i.test(lower)) {
      state.step = 'service';
      return askService(waId, state);
    }
    return sendText(waId, s.invalidChoice);
  }

  // step === 'done' — a returning message starts a fresh enquiry.
  sessions.delete(waId);
  return askLanguage(waId);
}

export function createWhatsAppApp() {
  const app = express();
  app.use(express.json());

  // Webhook verification handshake — https://developers.facebook.com/docs/graph-api/webhooks/getting-started
  app.get('/webhook', (req: Request, res: Response) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];
    if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  });

  app.post('/webhook', async (req: Request, res: Response) => {
    // Acknowledge immediately — Meta expects a fast 200 and will retry on timeout.
    res.sendStatus(200);
    try {
      const entry = req.body?.entry?.[0];
      const change = entry?.changes?.[0];
      const messages: IncomingMessage[] = change?.value?.messages ?? [];
      for (const msg of messages) {
        await handleMessage(msg);
      }
    } catch (err) {
      console.error('WhatsApp webhook processing error:', err);
    }
  });

  return app;
}
