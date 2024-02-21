const axios = require('axios');

async function getQuotation(symbol) {
  try {
    const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest', {
      params: {
        symbol,
        convert: 'USD',
        apiKey: process.env.CMC_API_KEY // Add your CoinMarketCap API key here
      }
    });
    return response.data.data[symbol].quote.USD.price;
  } catch (error) {
    console.error(`Error fetching ${symbol} quotation:`, error);
    throw error;
  }
}

module.exports = { getQuotation };
