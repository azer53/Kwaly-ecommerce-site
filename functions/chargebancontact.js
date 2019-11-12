require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
  })
  
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
  

exports.handler = async (event, context, callback) => {
    try {
        //-- We only care to do anything if this is our POST request.
        if (event.httpMethod !== "POST" || !event.body) {
          return {
            statusCode: 200,
            body: "This was not a POST request",
          };

        }

        const data = JSON.parse(event.body)
        console.log(data.type);
        if(data.type === "source.chargeable"){
            stripe.charges.create({
                amount: data.data.object.amount,
                currency: 'eur',
                source: data.data.object.id,
              }, function(err, charge) {
                callback(null,{
                    statuscode: 200,
                    body: JSON.stringify(charge)
                });
              });
        }
    }
    catch(err){
        return{
            statuscode:500,
            body: JSON.stringify(err)
        }
    }
}