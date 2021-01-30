const coinbase = require('coinbase-commerce-node');
const Client = coinbase.Client;
const Checkout = coinbase.resources.Checkout;
const Charge = coinbase.resources.Charge;
const Webhook = coinbase.Webhook;

Client.init(process.env.ECOMMERCE_API_KEY);

module.exports.coinbase = coinbase;
module.exports.Client = Client;
module.exports.Checkout = Checkout;
module.exports.Charge = Charge;
module.exports.Webhook = Webhook;
module.exports.webhookSecret = process.env.WEBHOOK_KEY;
