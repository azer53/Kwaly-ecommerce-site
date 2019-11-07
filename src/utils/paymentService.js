import { navigate } from "@reach/router"

const handleCreditCardPayment = async (data, stripe)=>{
    const fullName = data.fName + " " + data.lName
    const response = await stripe.handleCardPayment(data.clientSecret, {
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
        receipt_email: data.email,
      })
      console.log(response);
  }

  const handleBancontactPayment = async (data, stripe) => {
    const fullName = data.fName + " " + data.lName
    const {source} = await stripe.createSource({
        type: "bancontact",
        amount: 1099,
        currency: "eur",
        owner: {
          name: fullName,
        },
        redirect: {
          return_url: "https://localhost:8000/success",
        },
      })

        navigate(source.redirect.url)

  }

export { handleCreditCardPayment, handleBancontactPayment };