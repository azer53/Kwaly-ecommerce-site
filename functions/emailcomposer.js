require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

// todo add the sendgrid api env var
const client = require("@sendgrid/client")
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

client.setApiKey(process.env.SENDGRID_API_KEY)

const formatTemplateData = async (items, shippingOption) => {
  let returnObject = { total: 0, items: [] }

  for (let index = 0; index < items.length; index++) {
    const sku = await stripe.skus.retrieve(items[index].sku)
    returnObject.total += (sku.price / 100) * items[index].orderQuantity
    returnObject.items.push({
      displayName: sku.id,
      price: sku.price / 100,
      orderQuantity: items[index].orderQuantity,
    })
  }

  // TODO - get shipping values from contentful
  switch (shippingOption) {
    case "BE":
      returnObject.items.push({
        displayName: "Shipping Belgium",
        price: 3.95,
        orderQuantity: "",
      })
      returnObject.total += 3.95
      break
    case "NL":
      returnObject.items.push({
        displayName: "Shipping Netherlands",
        price: 7.0,
        orderQuantity: "",
      })
      returnObject.total += 7.0
      break
    case "SN":
      returnObject.items.push({
        displayName: "Pick-up in Sint-Niklaas",
        price: 0,
        orderQuantity: "",
      })

    default:
      break
  }

  return returnObject
}

const sendEmail = async (email, name, emailTemplateData) => {
  const request = {
    method: "POST",
    url: "/v3/mail/send",
  }

  // set the body data
  const data = {
    personalizations: [
      {
        to: [
          {
            email: email,
            name: name,
          }
        ],
        bcc:[{
          email: "orders@kwaly.be",
          name: "Kwaly Orders"
        },
        {
          email: "raphael@kwaly.be",
          name: "Raffi orders"
        }
        ],
        dynamic_template_data: emailTemplateData,
      },
    ],
    from: {
      email: "noreply@kwaly.be",
      name: "Kwaly",
    },
    reply_to: {
      email: "noreply@kwaly.be",
      name: "Kwaly",
    },
    template_id: "d-e6dd90a25ef54e76be7e781b3ac9e238",
  }

  request.body = data
  console.log("-- request body starts here --")
  console.log(JSON.stringify(request.body))
  // send the email, this is where the magic happens
  return client
    .request(request)
    .then(([response, body]) => {
      console.log("all went well")
      console.log(response.statusCode)
      console.log(body)
      return {
        statusCode: 200,
        body: JSON.stringify(response),
      }
    })
    .catch(err => {
      console.log("errors everywhere")
      console.log(JSON.stringify(err))
      return {
        statusCode: 500,
        body: JSON.stringify(err),
      }
    })
}

exports.handler = async (event, context) => {
  const requestBody = JSON.parse(event.body);
  const data = {};
  let metadata;
  let shippingDetails;
  let emailTo;
  switch (requestBody.type) {
    case "payment_intent.succeeded":
      console.log("-- Entering payment intent succeeded --")

      metadata = requestBody.data.object.metadata
      shippingDetails = requestBody.data.object.shipping
      emailTo = requestBody.data.object.receipt_email;
      break;

    case "charge.succeeded":
      console.log("-- Entering charge succeeded --")
      // only for bancontact
      if(!requestBody.data.object.payment_method_details["bancontact"]) {
        return {
          statusCode: 200,
          body: "Charge, but not a Bancontact payment, payment intent should fire"
        }
      }
      metadata = requestBody.data.object.source.metadata;
      shippingDetails = requestBody.data.object.source.source_order.shipping;
      emailTo = requestBody.data.object.source.source_order.email;
      break;

    default:
      return {
        statuscode: 200,
        body: "Bad action type",
      }
  }
  const shippingOption = metadata["shippingOption"]
  // get the sku data from the keys, but only the items, hence the filter
  const filteredItems = Object.keys(metadata).filter(element => {
    return element.includes("item-")
  })

  //restructure the filtered items and return an object with key/value pairing for the sku and ordered amount
  const reformatedItems = filteredItems.map(element => {
    return {
      sku: element.replace("item-", ""),
      orderQuantity: metadata[element],
    }
  })

  // go to stripe and get the sku's with prices and shipping
  const templateDataItems = await formatTemplateData(
    reformatedItems,
    shippingOption
  )

  const templateData = {
    subject: "Order Confirmation",
    total: templateDataItems.total,
    items: templateDataItems.items,
    receipt: true,
    name: shippingDetails.name,
    address01: shippingDetails.address.line1,
    city: shippingDetails.address.city,
    zip: shippingDetails.address.postal_code,
  }
  
  return sendEmail(
    emailTo,
    shippingDetails.name,
    templateData
  )
}
