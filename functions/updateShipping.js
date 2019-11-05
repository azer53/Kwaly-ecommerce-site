  require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
  }
)

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
}

exports.handler = async (event, context, callback) => {
  //-- We only care to do anything if this is our POST request.
  if (event.httpMethod !== "POST" || !event.body) {
    callback(null, {
      statusCode: 200,
      body: "This was not a POST request",
    })
    return
  }

  // Parse the body contents into an object.
  const data = JSON.parse(event.body)
  let shippingPrice = 0
  
      // TODO - get shipping values from contentful
      // values are in cents -> 50 = 5eur
  switch (data.shippingOption) {
    case "BE":
      shippingPrice = 50
      break
    case "NL":
      shippingPrice = 90
      break
    default:
      break
  }

  stripe.paymentIntents.retrieve(data.paymentIntentId, function(
    err,
    paymentIntent
  ) {
    stripe.paymentIntents.update(
      data.paymentIntentId,
      { amount: parseInt(shippingPrice,10) + parseInt(paymentIntent.amount,10) },
      function(err, paymentIntent) {
        paymentIntent.shippingPrice = shippingPrice
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(paymentIntent),
        })
        return
      }
    )
  })
}
