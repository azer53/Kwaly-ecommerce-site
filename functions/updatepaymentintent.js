require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
}

exports.handler = async (event, context, callback) => {
  try {
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
    const cart = data.cart

    let shippingPrice = 0

    // TODO - get shipping values from contentful
    // values are in cents -> 50 = 5eur
    switch (cart.shippingOption) {
      case "BE":
        shippingPrice = 395
        break
      case "NL":
        shippingPrice = 900
        break
      default:
        break
    }
    console.log(data.paymentIntentId);
    stripe.paymentIntents.retrieve(data.paymentIntentId, function(
      err,
      paymentIntent
    ) {
      console.log("-- got the payment intent --")
      console.log(paymentIntent.metadata)
      let body = {}

      // reformat the cart items into the body
      cart.items.forEach((element, index, array) => {
        body[element.sku] = element.orderQuantity
      })
      
        body["shippingOption"] = cart.shippingOption
        body["shippingPrice"] = cart.shippingPrice

        // calcutate new price with the selected shipping price
        // if there was an old shipping price subtract it from the total to avoid counting it double
        let newTotalPrice = parseInt(paymentIntent.amount, 10) + parseInt(shippingPrice, 10)
        if (paymentIntent.metadata.shippingOption) {
          newTotalPrice -= paymentIntent.metadata.shippingPrice;
        }

        const fullName = data.shipping.fName + " " + data.shipping.lName
      stripe.paymentIntents.update(
        paymentIntent.id,
        {
          amount:newTotalPrice,
          shipping: {
            address: {
              line1: data.shipping.street,
              city: data.shipping.city,
              country: data.shipping.country,
              postal_code: data.shipping.postal,
            },
            name: fullName,
          },
          receipt_email: data.shipping.email,
          metadata: body,
        },
        function(err, paymentIntent) {
          callback(null, {
            statusCode: 200,
            body: JSON.stringify(paymentIntent),
          })
        }
      )
    })
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    }
  }
}
