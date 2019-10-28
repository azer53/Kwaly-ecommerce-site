require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

module.exports = {
  createProduct: function(product) {
    if (productExists(product.slug)) {
      //todo fix updateBaseProduct(product)
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
      function(err, sku) {}
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
      //contains bug!
      if (product) {
        createSkus(baseProduct.variants, product.id)
      }
    }
  )
}

function updateBaseProduct(baseProduct) {
  //images and descriptions can be changed here
  stripe.products.update(baseProduct.title, function(err, product) {
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
    // asynchronously called, todo fix
    if (sku) return true
    else return false
  })
}

function productExists(productId) {
  stripe.products.retrieve(productId, function(err, product) {
    console.log(product)
    console.log(err)
    if (product) return true
    else return false
  })
}
