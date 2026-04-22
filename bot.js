const TelegramBot = require('node-telegram-bot-api');
const http = require('http');

// Keep-alive server for Railway
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Lakeside Whale Bot is Running...\n');
});
server.listen(process.env.PORT || 3000);

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// === SALES CONFIG ===
const GUMROAD_LINK = "https://lakesidehotel.gumroad.com/l/yabbzb";
const DEMO_LINK = "https://cryptolakeside.co.in/demo?ca=wif";
const DISCOUNT_CODE = "LAKESIDE20";

// Aliases for demo
const aliases = {
  "bonk": "bonk", "wif": "wif", "peace": "peace", "unc": "unc",
  "virtual": "virtual", "smartmoney": "smartmoney"
};

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 
    `🚀 *Welcome to Lakeside Institutional*\n\n` +
    `Real-time Solana Whale Radar for serious memecoin traders.\n\n` +
    `Track $5K+ whales with BUY/SELL, net worth, and Solscan links.\n\n` +
    `Type any token alias or CA to see demo data.`, 
    { parse_mode: 'Markdown' }
  );
});

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text ? msg.text.toLowerCase().trim() : "";

  if (text === "" || text.startsWith('/')) return;

  // Sales Keywords
  if (text.includes("buy") || text.includes("purchase") || text.includes("price") || text.includes("how much")) {
    bot.sendMessage(chatId, 
      `🔥 *Solana Whale Radar - Real-Time $5K+ Whale Tracker*\n\n` +
      `✅ Live whale tape\n` +
      `✅ BUY/SELL + USD value\n` +
      `✅ Wallet labels & net worth\n` +
      `✅ Direct Solscan links\n\n` +
      `💰 Pricing:\n` +
      `• $248 Lifetime (one-time)\n` +
      `• $49 / month\n\n` +
      `🎟️ Launch Offer: First 50 buyers get **20% off for 3 months**\n` +
      `Use code: *${DISCOUNT_CODE}*\n\n` +
      `👉 Buy Now: ${GUMROAD_LINK}\n\n` +
      `Want a demo first? Just send a token name (wif, bonk, peace...)`,
      { parse_mode: 'Markdown' }
    );
    return;
  }

  // Demo Request
  const target = aliases[text] || text;
  bot.sendMessage(chatId, 
    `📊 *Live Demo for ${text.toUpperCase()}*\n\n` +
    `👉 Open here: ${DEMO_LINK.replace("wif", target)}\n\n` +
    `Want full access with real-time data?`,
    { parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [{ text: "💰 Buy Lifetime Access ($248)", url: GUMROAD_LINK }],
          [{ text: "📲 Get 20% Off (Code: LAKESIDE20)", url: GUMROAD_LINK }]
        ]
      }
    }
  );
});

console.log("🚀 Lakeside Sales Bot is Online...");
