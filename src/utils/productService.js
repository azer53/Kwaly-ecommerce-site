require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

export const createProduct = () => {
  stripe.products.create(
    {
      name: "T-shirt",
      type: "good",
      description: "Comfortable cotton t-shirt",
      attributes: ["size", "gender"],
    },
    function(err, product) {
      // asynchronously called
    }
  )
}
