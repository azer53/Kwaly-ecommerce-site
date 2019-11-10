import { navigate } from "@reach/router"

const handleCreditCardPayment = async(data, stripe, cart)=>{
    const fullName = data.fName + " " + data.lName
    return await stripe.handleCardPayment(data.clientSecret, {
        payment_method_data: {
          billing_details: {
            name: fullName,
          },
        },
        shipping: {
          address: {
            line1: data.street,
            city: data.city,
            country: data.country,
            postal_code: data.postal,
          },
          name: fullName,
        },
        receipt_email: data.email
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

  const updatePaymentIntent = async(cart, paymentIntentId) =>{

    const body = { cart: cart, paymentIntentId: paymentIntentId }

    return fetch("/.netlify/functions/updatepaymentintent", {
      method: "POST",
      body: JSON.stringify(body)
    })
  }

export { handleCreditCardPayment, handleBancontactPayment, updatePaymentIntent };