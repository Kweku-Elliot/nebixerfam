const { Telegraf } = require('telegraf');

// Read the bot token from environment variables
const botToken = process.env.BOT_TOKEN;

if (!botToken) {
  throw new Error('Bot token is missing! Please set the BOT_TOKEN environment variable.');
}

// Initialize your Telegram bot
const bot = new Telegraf(botToken);

// Set Webhook URL (Replace with your Netlify site URL)
bot.telegram.setWebhook('https://nebixerfarm.netlify.app/.netlify/functions/telegram')
  .then(() => {
    console.log('Webhook successfully set!');
  })
  .catch((error) => {
    console.error('Error setting webhook:', error);
  });

// Define the /start command
bot.start((ctx) => {
  console.log('Received /start command:', ctx.message);  // Check if this is printed in logs

  const chatId = ctx.message.chat.id;
  const messageId = ctx.message.message_id;

  return ctx.reply(
    `👋 Join us now on this exciting journey!  

 Everything you do in  Telegram Matters!

Turn Your Screentime into Rewards with NEBIXER!`,
    {
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Launch App 🌐",
              web_app: {
                url: "https://nebixerfarm.netlify.app", // Your app URL
              },
            },
          ],
          [
            {
              text: "Join Community 💬",
              url: "https://t.me/nebixerFam", // Telegram community link
            },
          ],
        ],
      },
    }
  );
});

// Set up a fallback for other text messages
bot.on('text', (ctx) => {
  const chatId = ctx.message.chat.id;
  const messageId = ctx.message.message_id;

  console.log('Received message:', ctx.message);  // Log all received messages

  ctx.reply(
    `👋 Join us now on this exciting journey!  

 Everything you do in  Telegram Matters!

Turn Your Screentime into Rewards with NEBIXER!`,
    {
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Launch App 🌐",
              web_app: {
                url: "https://nebixerfarm.netlify.app", // Your app URL
              },
            },
          ],
          [
            {
              text: "Join Community 💬",
              url: "https://t.me/nebixerFam", // Telegram community link
            },
          ],
        ],
      },
    }
  );
});

// Handler for webhook
const handler = async (event, context) => {
  if (event.body) {
    console.log('Received event:', event.body);  // Log the incoming event to check if it’s coming through
    try {
      const update = JSON.parse(event.body);
      console.log('Parsed update:', update);  // Log parsed update for further debugging
      await bot.handleUpdate(update); // Handle the Telegram update
    } catch (error) {
      console.error('Error handling update:', error);
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Bot handled update' }), // Success message
  };
};

// Export the handler for Netlify to use (CommonJS style)
module.exports.handler = handler;
