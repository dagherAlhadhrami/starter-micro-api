var http = require('http');
const cron = require('node-cron');
const axios = require('axios');

// Function to fetch XRP price from Binance
async function getXrpPrice() {
  try {
    const response = await axios.get('https://api.binance.com/api/v3/ticker/price?symbol=XRPUSDT');
    const xrpPrice = response.data.price;
    const parsedNumber = parseFloat(xrpPrice);
    const formattedNumber = parsedNumber.toFixed(4);
    const message = `XRP: $${formattedNumber}`;
    // console.log(message);
    
    const webhookUrl = 'https://discord.com/api/webhooks/1098488527471259678/UAUBBV5m1Uhehox6NfLY2Xuk3kDof0DULBGDzLheX8Fa9LZigCVOqm-stsVqs4nHW1vF';

    sendDiscordMessage(webhookUrl, message);

  } catch (error) {
    console.error('Error fetching XRP price:', error.message);
  }
}

async function sendDiscordMessage(webhookUrl, message) {
    try {
      const response = await axios.post(webhookUrl, {
        content: message
      });
  
    //   console.log('Message sent to Discord successfully!');
    } catch (error) {
      console.error('Error sending message to Discord:', error.message);
    }
  }

// Create a cron job to fetch the XRP price every 10 seconds
cron.schedule('0 */1 * * * *', async () => {
  await getXrpPrice();
});

console.log('Cron job started. Fetching XRP price every 10 seconds...');

http.createServer(function (req, res) {
    console.log(`Just got a request at ${req.url}!`)
    res.write('Yo!');
    res.end();
}).listen(process.env.PORT || 3000);
