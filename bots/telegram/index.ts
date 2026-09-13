import { bot } from './bot';

bot.catch((err) => {
  console.error('Telegram bot error:', err.error);
});

bot.start({
  onStart: (info) => console.log(`FORMA Telegram intake bot running as @${info.username}`),
});
