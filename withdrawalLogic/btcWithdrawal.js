const bitcoin = require('bitcoinjs-lib');

const btcPrivateKey = process.env.BTC_PRIVATE_KEY;

if (!btcPrivateKey) {
  throw new Error('BTC private key is missing. Set BTC_PRIVATE_KEY environment variable.');
}

async function withdraw(amount, recipientAddress) {
  const network = bitcoin.networks.testnet; // Use appropriate network
  const keyPair = bitcoin.ECPair.fromWIF(btcPrivateKey, network);
  const txb = new bitcoin.TransactionBuilder(network);
  txb.addOutput(recipientAddress, amount);
  const tx = txb.buildIncomplete();
  return tx.toHex();
}

module.exports = { withdraw };
