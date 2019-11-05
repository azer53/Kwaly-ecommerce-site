require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
console.log("-- Start checkout --")
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context, callback) => {
  
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type"
  };
  
  //-- We only care to do anything if this is our POST request.
  if (event.httpMethod !== 'POST' || !event.body) {
    console.log("NOT A POST REQUEST")
    callback(null, {
      statusCode: 200,
      body: 'This was not a POST request'
    });
    return;
  }

  // Parse the body contents into an object.
    let data = [];
    let price = 0;
    try{
      data = JSON.parse(event.body);
      console.log(data);
    }
    catch{
      console.log("-- Catch: error parsing JSON --")
      callback(null, {
        statusCode: 200,
        body: 'Error parsing data. Expecting [{"sku": "sku-name", "quantity": 1 }], received: ' + JSON.stringify(event.body)  
      });
    }


  let skusPriceData = new Promise((resolve, reject)=>{
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
    console.log("-- ERROR RETRIEVING SKUS --")
    console.log(err)
  });


  skusPriceData.then(()=>{
    console.log("-- Initiating paymentIntent --")
    (async () => {
       const paymentIntent = await stripe.paymentIntents.create({
        amount: price,
        currency: 'eur',
        payment_method_types: ['card'],
      });

      console.log(paymentIntent)
      console.log("sending status OK")
      callback(null, {
        statusCode: 200,
        headers,
        body: JSON.stringify({paymentIntent})
      });
    })();


  })

}
