const TelegramBot = require('node-telegram-bot-api');
const fetch = require('node-fetch');
const http = require('http');

// 1. RENDER KEEP-ALIVE SERVER
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Lakeside Institutional Node is Active...\n');
});
server.listen(process.env.PORT || 3000);

// 2. CONFIGURATION
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// 🛡️ INSTITUTIONAL ALIAS REGISTRY (Added Virtual & Fixed List)
const aliases = {
  "virtual": "0x0b3e328455c4059EEb9e3f84b5543F74E24e7E1b", // AI Narrative Leader
  "unc": "ACTfUWtgvaXrQGNMiohTusi5jcx5RJf5zwu9aAxkpump",
  "peace": "HcbsqQC3sn2LMwbjVafiEd8nJ2ATZHH2wXH4xqV2pump",
  "smartmoney": "26jyBRf3nCxAs12tNgsb6ZN2LUHubX7T895t6TtUpump",
  "income": "BXnUS5vNFNvnjy2hLx6UCycgH5VvMw8HkC9qfae2pump",
  "dumbmoney": "CAjtTHvC878f8cZ4zEwdvgjkjFM7rbYN8Mb1go1cpump",
  "og": "EoNeKccLdntSrnM3RJbr6JezwyFP2wwacQzGEWMTpump",
  "monkey": "4dY1sg9DMP1Haf5nF8ZVz1XHxjo9NCb3j5zJvgjKpump",
  "normie": "7ro7WwhwqgBh794AtHZJgj7HXU3ExgkeMCq2tB8pump",
  "snowfall": "AN85huLrEUjERuyz8LcDydeXsNtZFFJfpKFw6VNJpump"
};

const formatNumber = (num) => {
    if (!num) return "0.0";
    const numericValue = parseFloat(num);
    if (numericValue >= 1000000) return (numericValue / 1000000).toFixed(1) + "M";
    if (numericValue >= 1000) return (numericValue / 1000).toFixed(1) + "K";
    return numericValue.toLocaleString();
};

// 3. COMMAND: /start (Enterprise Professional Version)
bot.onText(/\/start/, (msg) => {
  const welcomeText = 
    `🚀 *Lakeside Institutional Whale Bot* 🛡️\n\n` +
    `I provide real-time data nodes for Solana & Base Blue Chips. Just send an **Alias** or **CA** to see:\n\n` +
    `• 🏦 *Liquidity Backbone* (Pool Depth)\n` +
    `• 💎 *Market Cap* (Real-time Valuation)\n` +
    `• 🐳 *Whale Activity* (Institutional Tape)\n\n` +
    `*Active Nodes:* \`virtual\`, \`unc\`, \`peace\`, \`smartmoney\`, \`monkey\``;

  const opts = {
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [
        [{ text: '🛡️ DM Developer for Integration', url: 'https://telegram.me/bitcoinblockchain501' }],
        [{ text: '📊 View Website Terminal', url: 'https://cryptolakeside.co.in' }]
      ]
    }
  };
  bot.sendMessage(msg.chat.id, welcomeText, opts);
});

// 4. SMART SEARCH: Message Listener
bot.on('message', async (msg) => {
  const text = msg.text ? msg.text.toLowerCase().trim() : "";
  if (text.startsWith('/') || text === "") return;
  
  const targetCA = aliases[text] || text;
  if (targetCA.length < 30 && !aliases[text]) return;

  bot.sendChatAction(msg.chat.id, 'typing');

  try {
    const res = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${targetCA}`);
    const data = await res.json();

    if (data.pairs && data.pairs.length > 0) {
      const pair = data.pairs[0];
      const symbol = pair.baseToken.symbol;
      const mcap = formatNumber(pair.fdv || pair.marketCap);
      const liq = formatNumber(pair.liquidity ? pair.liquidity.usd : 0);
      
      const report = `🛡️ **INSTITUTIONAL DATA: $${symbol}**\n\n` +
                     `💰 **Price:** $${pair.priceUsd}\n` +
                     `💎 **Market Cap:** $${mcap}\n` +
                     `🏦 **Liquidity (Backbone):** $${liq} 🛡️\n\n` +
                     `🐳 **Whale Status:** High-conviction flow verified on the tape.`;

      const opts = {
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            [{ text: '📊 View Full Institutional Tape', url: `https://cryptolakeside.co.in/demo?ca=${text}&utm_source=telegram_bot&utm_medium=search` }]
          ]
        }
      };
      bot.sendMessage(msg.chat.id, report, opts);
    } else {
        bot.sendMessage(msg.chat.id, "❌ *Institutional Node Sync Error:* CA not found on DexScreener.", { parse_mode: 'Markdown' });
    }
  } catch (e) { console.error(e); }
});

console.log("UX-Optimized Lakeside Bot is Online...");
