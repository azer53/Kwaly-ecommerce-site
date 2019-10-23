require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

module.exports = {
  createProduct: function(product) {
    createBaseProducts(product)
  },
  productExists: function() {
    return true
  },
}

function createSkus(variants, baseProductStripeId) {
  //replace with foreach
  variant = variants[0]
  stripe.skus.create(
    {
      product: baseProductStripeId,
      attributes: { size: variant.size },
      price: variant.price,
      currency: "eur",
      inventory: { type: "finite", quantity: variant.initialStockLevel },
    },
    function(err, sku) {
      console.log(err)
    }
  )
}

function createBaseProducts(baseProduct) {
  console.log(baseProduct)
  stripe.products.create(
    {
      name: baseProduct.title,
      type: "good",
      attributes: ["size"],
    },
    function(err, product) {
      console.log(err)
      createSkus(baseProduct.variants, product.id)
    }
  )
}
