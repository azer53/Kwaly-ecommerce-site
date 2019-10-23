require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

module.exports = {
  createProduct: function(product) {
    if (productExists(product.slug)) {
      updateBaseProduct(product)
    } else {
      createBaseProducts(product)
    }
  },
}

function createSkus(variants, baseProductStripeId) {
  variants.forEach(function(variant) {
    stripe.skus.create(
      {
        product: baseProductStripeId,
        attributes: {
          size: variant.size,
          name: baseProductStripeId + "-" + variant.size,
        },
        price: variant.price * 100,
        currency: "eur",
        inventory: { type: "finite", quantity: variant.initialStockLevel },
      },
      function(err, sku) {
        console.log(err)
      }
    )
  })
}

function createBaseProducts(baseProduct) {
  stripe.products.create(
    {
      id: baseProduct.slug,
      name: baseProduct.slug,
      type: "good",
      attributes: ["size", "name"],
    },
    function(err, product) {
      console.log(err)
      createSkus(baseProduct.variants, product.id)
    }
  )
}

function updateBaseProduct(baseProduct) {
  //images and descriptions can be changed here
  stripe.products.update(baseProduct.title, function(err, product) {
    console.log(err)
    baseProduct.variants.forEach(function(variant) {
      if (!skuExists(product.id + "-" + variant.size)) {
        var variants = [variant]
        createSkus(variants, product.id)
      }
    })
  })
}

function skuExists(skuId) {
  stripe.skus.retrieve(skuId, function(err, sku) {
    // asynchronously called
    if (sku) return true
  })
}

function productExists(productId) {
  stripe.products.retrieve(productId, function(err, product) {
    // asynchronously called
    if (product) return true
  })
}
