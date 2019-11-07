require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

const calculateOrderAmount = async items => {
  console.log(items)
  const res = await stripe.skus.retrieve("recycled-kwaly-sweater-small")
  return res.price
}

exports.handler = async (event, context, callback) => {
  const data = JSON.parse(event.body)
  const items = data.items

  const paymentIntent = await stripe.paymentIntents.create({
    amount: await calculateOrderAmount(items),
    currency: "eur",
  })

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
    },
    body: JSON.stringify({
      publishableKey: process.env.GATSBY_STRIPE_PUBLIC_KEY,
      clientSecret: paymentIntent.client_secret,
    }),
  }
}
