require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

module.exports = {
  createProduct: function() {
    console.log("entering create product")
    stripe.products.create(
      {
        name: "T-shirt",
        type: "good",
        description: "Comfortable cotton t-shirt",
        attributes: ["size", "gender"],
      },
      function(err, product) {
        console.log(err)
      }
    )
  },
  otherMethod: function() {},
}
