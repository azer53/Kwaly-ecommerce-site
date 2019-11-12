import { navigate } from "@reach/router"

const handleCreditCardPayment = async(data, stripe)=>{
    return await stripe.handleCardPayment(data.client_secret, {
        payment_method_data: {
          billing_details: {
            name: data.shipping.name,
          },
        },
      })    
  }

  const handleBancontactPayment = async (data, stripe, cart) => {
    const fullName = data.fName + " " + data.lName

    const {source} = await stripe.createSource({
        type: "bancontact",
        amount: (cart.total * 100),
        currency: "eur",
        owner: {
          name: fullName,
        },
        redirect: {
          return_url: "http://localhost:8000/success",
        },
      })
      navigate(source.redirect.url)

  }

  const updatePaymentIntent = async(cart, paymentIntentId, formData) =>{

    const body = { cart: cart, paymentIntentId: paymentIntentId, shipping: formData}

    return fetch("/.netlify/functions/updatepaymentintent", {
      method: "POST",
      body: JSON.stringify(body)
    })
  }

export { handleCreditCardPayment, handleBancontactPayment, updatePaymentIntent };