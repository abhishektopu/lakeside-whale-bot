const TelegramBot = require('node-telegram-bot-api');
const http = require('http');

const server = http.createServer((req, res) => res.end('Bot Alive'));
server.listen(process.env.PORT || 3000);

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

const GUMROAD = "https://lakesidehotel.gumroad.com/l/yabbzb";
const DEMO_BASE = "https://cryptolakeside.co.in/demo?ca=";
const CODE = "LAKESIDE20";

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 
    `🚀 *Lakeside Whale Radar Bot*\n\n` +
    `Real-time $5K+ whale tracking on Solana.\n\n` +
    `Send any token (wif, bonk, peace...) for live demo.`,
    { parse_mode: 'Markdown' }
  );
});

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = (msg.text || "").toLowerCase().trim();

  if (!text || text.startsWith('/')) return;

  // Sales Triggers
  if (["buy", "price", "purchase", "cost", "how much"].some(k => text.includes(k))) {
    bot.sendMessage(chatId,
      `🔥 *Solana Whale Radar - Real-Time $5K+ Whale Tracker*\n\n` +
      `✅ Live whale tape ($5,000+ only)\n` +
      `✅ BUY/SELL with exact USD\n` +
      `✅ Wallet net worth + labels\n` +
      `✅ Direct Solscan links\n\n` +
      `💰 *Pricing:*\n` +
      `• $248 Lifetime\n` +
      `• $49/month\n\n` +
      `🎟️ *20% OFF for 3 months* → Code: *${CODE}*\n\n` +
      `👉 Buy Now: ${GUMROAD}`,
      { parse_mode: 'Markdown',
        reply_markup: { inline_keyboard: [[{ text: "💰 Buy Lifetime Access", url: GUMROAD }]] }
      }
    );
    return;
  }

  // Token Demo
  const token = text.replace(/[^a-z0-9]/g, '');
  const demoUrl = DEMO_BASE + (token || "wif");

  bot.sendMessage(chatId,
    `📊 *Live Demo for ${text.toUpperCase()}*\n\n` +
    `👉 Open here: ${demoUrl}\n\n` +
    `Want full access with real-time whale data?`,
    { parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [{ text: "💰 Buy Lifetime ($248)", url: GUMROAD }],
          [{ text: `🎟️ 20% OFF (Code: ${CODE})`, url: GUMROAD }]
        ]
      }
    }
  );
});

console.log("🚀 Lakeside Sales Bot is Running...");
