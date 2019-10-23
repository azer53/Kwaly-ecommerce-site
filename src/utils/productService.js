require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

module.exports = {
  createProduct: function(name) {
    stripe.products.create(
      {
        name: name,
        type: "good",
        attributes: ["size"],
      },
      function(err, product) {
        console.log(err)
      }
    )
  },
  productExists: function() {
    return true
  },
}
