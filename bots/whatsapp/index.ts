import { createWhatsAppApp } from './webhook';

const PORT = Number(process.env.WHATSAPP_PORT ?? 3001);
createWhatsAppApp().listen(PORT, () => {
  console.log(`FORMA WhatsApp intake webhook listening on :${PORT}`);
});
