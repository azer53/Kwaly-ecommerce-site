require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

// Fetch SKUS and calculate the total order amount
const calculateOrderAmount = async (items, shippingOption) => {
  let total = 0

  for (let index = 0; index < items.length; index++) {
    const sku = await stripe.skus.retrieve(items[index].sku);
    total += sku.price * items[index].orderQuantity
  }

  // TODO - get shipping values from contentful
  // values are in cents -> 50 = 5eur
  switch (shippingOption) {
    case "BE":
      total += 395
      break
    case "NL":
      total += 900
      break
    default:
      break
  }
  return total
}

const formatMetadata = (cart) => {
  let metadata = {};
  // reformat the cart items into metadata
  cart.items.forEach((element, index, array) => {
    metadata["item-"+element.sku] = element.orderQuantity;
  });

  metadata["shippingOption"] = cart.shippingOption;
  metadata["shippingPrice"] = cart.shippingPrice;

  return metadata;
}

// Called when invoked by url
exports.handler = async (event, context, callback) => {
  const data = JSON.parse(event.body)

  let payableAmount = await calculateOrderAmount(
    data.cart.items,
    data.cart.shippingOption
  )

  let metadata = formatMetadata(data.cart)
  let response;

  switch (data.selectedCard) {
    case "credit":
      const paymentIntent = await stripe.paymentIntents.create({
        amount: payableAmount,
        currency: "eur",          
        shipping: {
          address: {
            line1: data.formData.street,
            city: data.formData.city,
            country: data.formData.country,
            postal_code: data.formData.postal,
          },
          name: data.formData.fName + " " + data.formData.lName,
        },
        receipt_email: data.formData.email,
        metadata: metadata,
      });
      response = {paymentIntent: paymentIntent};
      break

    case "bancontact":
      const orderItems = data.cart.items.map((item)=>{
        return {
          amount: item.orderQuantity,
          parent: item.sku,
          type: "sku",
          currency: "eur",
          description: item.sku
        }
      })
      const source = await stripe.sources.create({
        type: "bancontact",
        amount: payableAmount,
        currency: "eur",
        owner: {
          email: data.formData.email,
          name: data.formData.fName + " " + data.formData.lName,
        },
        source_order: {
          items: orderItems,
          shipping: {
            address: {
              line1: data.formData.street,
              city: data.formData.city,
              country: data.formData.country,
              postal_code: data.formData.postal,
            },
            name: data.formData.fName + " " + data.formData.lName,
          }
        },
        metadata: metadata,
        redirect: {
          return_url: "http://localhost:8000/success",
        },
      });
      response = {source: source};
      break;

    default:
      break
  }

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
    },
    body: JSON.stringify(response)
  }
}
