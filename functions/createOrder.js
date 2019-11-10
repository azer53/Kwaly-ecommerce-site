require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
  })
  
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

  const createOrder = async(data, cart) => {
    const fullName = data.fName + " " + data.lName

    let orderItems = cart.items.map(i=> { return {
        type: "sku",
        parent: i.sku,
        quantity: i.quantity
    }} ) 

  const order = await stripe.orders.create({
    currency: "eur",
    email: data.email,
    items: orderItems,
    shipping: {
        address: {
          line1: data.street,
          city: data.city,
          country: data.country,
          postal_code: data.postal,
        },
        name: fullName,
    },
  });
  console.log("created order: ");
  console.log(order);
  return order;
}

  exports.handler = async (event, context, callback) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
      }

      const body = JSON.parse(event.body);
      console.log(body);
      const order = await createOrder(body.data, body.cart);

      return{
          statusCode: 200,    
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
          },
          body: JSON.stringify(order)
      }
  }