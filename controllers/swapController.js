const coinMarketCapService = require('../services/coinMarketCapService');
const btcWithdrawal = require('../withdrawalLogic/btcWithdrawal');
const xmrWithdrawal = require('../withdrawalLogic/xmrWithdrawal');

async function calculateEquivalentAmount(amount, currency) {
  const price = await coinMarketCapService.getQuotation(currency);
  return amount * price;
}

async function processSwap(req, res) {
  const { amount, fromCurrency, toCurrency, recipientAddress } = req.body;

  // Validation checks
  if (!amount || !fromCurrency || !toCurrency || !recipientAddress) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  if (fromCurrency === toCurrency) {
    return res.status(400).json({ error: 'From and To currencies must be different' });
  }

  try {
    let withdrawalTx;
    let equivalentAmount;

    if (fromCurrency === 'BTC' && toCurrency === 'XMR') {
      equivalentAmount = await calculateEquivalentAmount(amount, fromCurrency);
      withdrawalTx = await btcWithdrawal.withdraw(amount, recipientAddress);
    } else if (fromCurrency === 'XMR' && toCurrency === 'BTC') {
      equivalentAmount = await calculateEquivalentAmount(amount, fromCurrency);
      withdrawalTx = await xmrWithdrawal.withdraw(amount, recipientAddress);
    } else {
      throw new Error('Invalid currency pair');
    }

    // If the withdrawal was successful, return the transaction details
    res.status(200).json({ message: 'Swap successful', equivalentAmount, withdrawalTx });
  } catch (error) {
    console.error('Error processing swap:', error);
    res.status(500).json({ error: 'An error occurred while processing the swap' });
  }
}

module.exports = { processSwap };
