import type { BotLocale, ContactMethod, LocationSlug, ProjectTypeSlug, ServiceSlug } from './flow';

export const LANGUAGE_PROMPT = 'Please choose your language / Пожалуйста, выберите язык / กรุณาเลือกภาษา / בחרו שפה בבקשה';

export const LANGUAGE_BUTTONS: { locale: BotLocale; label: string }[] = [
  { locale: 'en', label: 'English' },
  { locale: 'ru', label: 'Русский' },
  { locale: 'th', label: 'ไทย' },
  { locale: 'he', label: 'עברית' },
];

interface BotStrings {
  services: Record<ServiceSlug, string>;
  locations: Record<LocationSlug, string>;
  projectTypes: Record<ProjectTypeSlug, string>;
  contactMethods: Record<ContactMethod, string>;
  prompts: {
    service: string;
    location: string;
    projectType: string;
    description: string;
    budget: string;
    timeline: string;
    attachments: string;
    contactName: string;
    contactMethod: string;
    contactValue: string;
    reviewIntro: string;
  };
  buttons: {
    back: string;
    skip: string;
    restart: string;
    edit: string;
    submit: string;
    yes: string;
    no: string;
  };
  submitted: string;
  restarted: string;
  invalidChoice: string;
  fallbackHuman: string;
}

export const botStrings: Record<BotLocale, BotStrings> = {
  en: {
    services: {
      architecture: 'Architecture',
      'villa-design': 'Villa Design',
      'interior-design': 'Interior Design',
      construction: 'Construction',
      renovation: 'Renovation',
      'project-management': 'Project Management',
      'construction-supervision': 'Construction Supervision',
      'technical-supervision': 'Technical Supervision',
      'landscape-design': 'Landscape Design',
      'permits-planning': 'Permits & Planning',
      'turnkey-projects': 'Turnkey Projects',
      'eco-construction': 'Eco Construction',
      'concrete-construction': 'Concrete Construction',
    },
    locations: { 'koh-phangan': 'Koh Phangan', 'koh-samui': 'Koh Samui', 'koh-tao': 'Koh Tao', bali: 'Bali', other: 'Other / Not decided' },
    projectTypes: {
      'villa-residence': 'Villa / Residence',
      hospitality: 'Hospitality',
      commercial: 'Commercial',
      renovation: 'Renovation',
      'land-new-build': 'Land / New Build',
      other: 'Other',
    },
    contactMethods: { telegram: 'Telegram', whatsapp: 'WhatsApp', email: 'Email', phone: 'Phone call' },
    prompts: {
      service: 'Which service are you interested in?',
      location: 'Where is your project located?',
      projectType: 'What type of project is this?',
      description: 'Tell us about your project in a few sentences — site, size, what you have in mind.',
      budget: 'Do you have an approximate budget in mind? (optional — type "skip" to continue)',
      timeline: 'Do you have a timeline in mind? (optional — type "skip" to continue)',
      attachments: 'Feel free to send photos, plans or inspiration images now, or type "skip" to continue.',
      contactName: 'What name should we use to reach you?',
      contactMethod: 'How would you prefer we contact you?',
      contactValue: 'Please share the contact detail for that method (number, email, or @username).',
      reviewIntro: 'Here is a summary of your enquiry. Reply "submit" to send it, "edit" to change something, or "restart" to start over.',
    },
    buttons: { back: '← Back', skip: 'Skip', restart: 'Restart', edit: 'Edit', submit: 'Submit', yes: 'Yes', no: 'No' },
    submitted: 'Thank you — your enquiry has been sent to our team. We reply personally to every enquiry, usually within one business day.',
    restarted: 'Starting over. Please choose your language.',
    invalidChoice: 'Sorry, please choose one of the options shown.',
    fallbackHuman: 'If you would rather speak with a person directly, just say so at any point and we will follow up personally.',
  },
  ru: {
    services: {
      architecture: 'Архитектура',
      'villa-design': 'Дизайн виллы',
      'interior-design': 'Дизайн интерьера',
      construction: 'Строительство',
      renovation: 'Реновация',
      'project-management': 'Управление проектом',
      'construction-supervision': 'Строительный надзор',
      'technical-supervision': 'Технический надзор',
      'landscape-design': 'Ландшафтный дизайн',
      'permits-planning': 'Разрешения и планирование',
      'turnkey-projects': 'Проекты под ключ',
      'eco-construction': 'Эко-строительство',
      'concrete-construction': 'Бетонное строительство',
    },
    locations: { 'koh-phangan': 'Ко Панган', 'koh-samui': 'Ко Самуи', 'koh-tao': 'Ко Тао', bali: 'Бали', other: 'Другое / не определено' },
    projectTypes: {
      'villa-residence': 'Вилла / резиденция',
      hospitality: 'Гостиничный проект',
      commercial: 'Коммерческий объект',
      renovation: 'Реновация',
      'land-new-build': 'Земля / новое строительство',
      other: 'Другое',
    },
    contactMethods: { telegram: 'Telegram', whatsapp: 'WhatsApp', email: 'Email', phone: 'Звонок' },
    prompts: {
      service: 'Какая услуга вас интересует?',
      location: 'Где расположен ваш проект?',
      projectType: 'Какой это тип проекта?',
      description: 'Расскажите коротко о вашем проекте — участок, масштаб, что вы задумали.',
      budget: 'Есть ли примерный бюджет? (необязательно — напишите «пропустить», чтобы продолжить)',
      timeline: 'Есть ли желаемые сроки? (необязательно — напишите «пропустить», чтобы продолжить)',
      attachments: 'Можете отправить фото, планы или референсы сейчас, либо напишите «пропустить».',
      contactName: 'Как к вам обращаться?',
      contactMethod: 'Каким способом вам удобнее, чтобы мы связались?',
      contactValue: 'Укажите контакт для этого способа связи (номер, email или @username).',
      reviewIntro: 'Вот сводка вашей заявки. Напишите «отправить», чтобы отправить, «изменить» — чтобы поправить, или «заново» — чтобы начать сначала.',
    },
    buttons: { back: '← Назад', skip: 'Пропустить', restart: 'Заново', edit: 'Изменить', submit: 'Отправить', yes: 'Да', no: 'Нет' },
    submitted: 'Спасибо — ваша заявка отправлена нашей команде. Мы отвечаем лично на каждый запрос, обычно в течение одного рабочего дня.',
    restarted: 'Начинаем заново. Пожалуйста, выберите язык.',
    invalidChoice: 'Пожалуйста, выберите один из предложенных вариантов.',
    fallbackHuman: 'Если вы хотите сразу поговорить с человеком — просто напишите об этом, и мы свяжемся с вами лично.',
  },
  th: {
    services: {
      architecture: 'สถาปัตยกรรม',
      'villa-design': 'ออกแบบวิลล่า',
      'interior-design': 'ออกแบบภายใน',
      construction: 'ก่อสร้าง',
      renovation: 'ปรับปรุง/รีโนเวท',
      'project-management': 'บริหารโครงการ',
      'construction-supervision': 'ควบคุมงานก่อสร้าง',
      'technical-supervision': 'ควบคุมงานเทคนิค',
      'landscape-design': 'ออกแบบภูมิทัศน์',
      'permits-planning': 'ขออนุญาตและวางแผน',
      'turnkey-projects': 'โครงการครบวงจร',
      'eco-construction': 'ก่อสร้างเชิงนิเวศ',
      'concrete-construction': 'งานก่อสร้างคอนกรีต',
    },
    locations: { 'koh-phangan': 'เกาะพะงัน', 'koh-samui': 'เกาะสมุย', 'koh-tao': 'เกาะเต่า', bali: 'บาหลี', other: 'อื่นๆ / ยังไม่ตัดสินใจ' },
    projectTypes: {
      'villa-residence': 'วิลล่า / ที่พักอาศัย',
      hospitality: 'ธุรกิจโรงแรม',
      commercial: 'เชิงพาณิชย์',
      renovation: 'ปรับปรุง/รีโนเวท',
      'land-new-build': 'ที่ดิน / สร้างใหม่',
      other: 'อื่นๆ',
    },
    contactMethods: { telegram: 'Telegram', whatsapp: 'WhatsApp', email: 'อีเมล', phone: 'โทรศัพท์' },
    prompts: {
      service: 'คุณสนใจบริการใด?',
      location: 'โครงการของคุณตั้งอยู่ที่ไหน?',
      projectType: 'โครงการนี้เป็นประเภทใด?',
      description: 'เล่าเกี่ยวกับโครงการของคุณสั้นๆ — ที่ดิน ขนาด และสิ่งที่คุณต้องการ',
      budget: 'มีงบประมาณโดยประมาณหรือไม่? (ไม่บังคับ — พิมพ์ "ข้าม" เพื่อดำเนินการต่อ)',
      timeline: 'มีกรอบเวลาที่ต้องการหรือไม่? (ไม่บังคับ — พิมพ์ "ข้าม" เพื่อดำเนินการต่อ)',
      attachments: 'ส่งรูปภาพ แบบแปลน หรือภาพอ้างอิงได้เลย หรือพิมพ์ "ข้าม" เพื่อดำเนินการต่อ',
      contactName: 'ให้เราเรียกคุณว่าอย่างไรดี?',
      contactMethod: 'คุณสะดวกให้เราติดต่อทางช่องทางใด?',
      contactValue: 'กรุณาระบุข้อมูลติดต่อสำหรับช่องทางนั้น (เบอร์โทร อีเมล หรือ @username)',
      reviewIntro: 'นี่คือสรุปคำขอของคุณ พิมพ์ "ส่ง" เพื่อส่งคำขอ "แก้ไข" เพื่อเปลี่ยนแปลง หรือ "เริ่มใหม่" เพื่อเริ่มต้นใหม่',
    },
    buttons: { back: '← ย้อนกลับ', skip: 'ข้าม', restart: 'เริ่มใหม่', edit: 'แก้ไข', submit: 'ส่ง', yes: 'ใช่', no: 'ไม่ใช่' },
    submitted: 'ขอบคุณครับ/ค่ะ — คำขอของคุณถูกส่งถึงทีมงานแล้ว เราจะตอบกลับทุกคำขอด้วยตนเอง โดยปกติภายในหนึ่งวันทำการ',
    restarted: 'เริ่มต้นใหม่ กรุณาเลือกภาษา',
    invalidChoice: 'กรุณาเลือกจากตัวเลือกที่แสดงไว้',
    fallbackHuman: 'หากต้องการพูดคุยกับเจ้าหน้าที่โดยตรง เพียงแจ้งได้ทุกเมื่อ และเราจะติดต่อกลับเป็นการส่วนตัว',
  },
  he: {
    services: {
      architecture: 'אדריכלות',
      'villa-design': 'תכנון וילות',
      'interior-design': 'עיצוב פנים',
      construction: 'בנייה',
      renovation: 'שיפוץ',
      'project-management': 'ניהול פרויקטים',
      'construction-supervision': 'פיקוח בנייה',
      'technical-supervision': 'פיקוח טכני',
      'landscape-design': 'עיצוב נוף',
      'permits-planning': 'היתרים ותכנון',
      'turnkey-projects': 'פרויקטים מקיפים',
      'eco-construction': 'בנייה ירוקה',
      'concrete-construction': 'בנייה בבטון',
    },
    locations: { 'koh-phangan': 'קו פנגן', 'koh-samui': 'קו סמוי', 'koh-tao': 'קו טאו', bali: 'באלי', other: 'אחר / טרם הוחלט' },
    projectTypes: {
      'villa-residence': 'וילה / מגורים',
      hospitality: 'אירוח',
      commercial: 'מסחרי',
      renovation: 'שיפוץ',
      'land-new-build': 'קרקע / בנייה חדשה',
      other: 'אחר',
    },
    contactMethods: { telegram: 'טלגרם', whatsapp: 'וואטסאפ', email: 'אימייל', phone: 'שיחת טלפון' },
    prompts: {
      service: 'באיזה שירות אתם מעוניינים?',
      location: 'היכן ממוקם הפרויקט שלכם?',
      projectType: 'מה סוג הפרויקט?',
      description: 'ספרו לנו בקצרה על הפרויקט — המגרש, הגודל, מה בראש שלכם.',
      budget: 'יש לכם תקציב משוער בראש? (לא חובה — כתבו "דלג" כדי להמשיך)',
      timeline: 'יש לכם לוח זמנים בראש? (לא חובה — כתבו "דלג" כדי להמשיך)',
      attachments: 'אפשר לשלוח עכשיו תמונות, תוכניות או השראה, או לכתוב "דלג" כדי להמשיך.',
      contactName: 'איך לקרוא לכם?',
      contactMethod: 'איך תעדיפו שניצור קשר?',
      contactValue: 'שתפו את פרטי הקשר המתאימים (מספר, אימייל, או @username).',
      reviewIntro: 'הנה סיכום הפנייה שלכם. השיבו "שלח" כדי לשלוח, "ערוך" כדי לשנות, או "התחל מחדש" כדי להתחיל מחדש.',
    },
    buttons: { back: '← חזרה', skip: 'דלג', restart: 'התחל מחדש', edit: 'ערוך', submit: 'שלח', yes: 'כן', no: 'לא' },
    submitted: 'תודה — הפנייה שלכם נשלחה לצוות שלנו. אנו משיבים אישית לכל פנייה, בדרך כלל בתוך יום עסקים אחד.',
    restarted: 'מתחילים מחדש. בחרו שפה בבקשה.',
    invalidChoice: 'נא לבחור אחת מהאפשרויות המוצגות.',
    fallbackHuman: 'אם תעדיפו לדבר עם בן אדם ישירות, פשוט ציינו זאת בכל שלב ואנו נחזור אליכם באופן אישי.',
  },
};
