const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "75wb98rqqbpnfq7m",
  publicKey: "h6njg28j7jtgzgm4",
  privateKey: "eec898857b122417ac68e19900a472e8"
});

exports.getToken = (req,res) => {

    gateway.clientToken.generate( {},
        (err, response) => {
        if(err){
            res.status(500).send(err)
        }
        else{
        res.send( response)
    }
      });

} 
exports.processPayment = (req,res) => {

let nonceFromTheClient = req.body.paymentMethodNonce
let amountFromTheClient = req.body.amount

    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, (err, result) => {
          if(err){
              res.status(500).json(err)
          }
          else{
              res.json(result)
          }
      });

}