require('dotenv').config();

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type"
};


exports.handler = async (event, context, callback) => {

  //-- We only care to do anything if this is our POST request.
  if (event.httpMethod !== 'POST' || !event.body) {
    callback(null, {
      statusCode: 200,
      body: 'This was not a POST request'
    });
    return;
  }

  // Parse the body contents into an object.
  const data = JSON.parse(event.body);
  const stripe = require('stripe')('sk_test_BteocGRq9IiIiKrHYLLAjpb3');
  let price = 0;

  console.log(data);

  var skusPriceData = new Promise((resolve, reject)=>{
    data.forEach((element,index,array) => {
      stripe.skus.retrieve(
        element.sku,
        function(err, sku) {
          console.log("fetched sku " + JSON.stringify(sku));
          price += (sku.price * element.quantity);
          if (index === array.length -1) resolve();
        }
      );
    })
  }).catch((err)=>{
    console.log("ERROR IN PROMISE")
    console.log(err)
  });


  skusPriceData.then(()=>{


    (async () => {
       const paymentIntent = await stripe.paymentIntents.create({
        amount: price,
        currency: 'eur',
        payment_method_types: ['card'],
      });

      console.log("sending status OK")
      callback(null, {
        statusCode: 200,
        headers,
        body: JSON.stringify({paymentIntent})
      });
    })();


  })

}
