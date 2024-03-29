require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

exports.handler = async (event, context, callback) => {
  //-- We only care to do anything if this is our POST request.
  if (event.httpMethod !== "POST" || !event.body) {
    return {
      statusCode: 200,
      body: "This was not a POST request",
    }
  }

  const data = JSON.parse(event.body)
  if (data.type === "source.chargeable") {
    let charge
    try {
      charge = await stripe.charges.create({
        amount: data.data.object.amount,
        currency: "eur",
        source: data.data.object.id,
      })
    } catch (err) {
      console.log(err)
      return {
        statusCode: 500,
        body: JSON.stringify(err),
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify(charge),
    }
  } else {
    return {
      statusCode: 200,
      body: "Bad event type",
    }
  }
}
