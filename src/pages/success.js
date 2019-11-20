import React, { useState } from "react"
import Delivery from "../components/images/delivery"
import queryString from "query-string"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Success = props => {
  const [paymentSuccessful, setpaymentSuccesful] = useState(true)
  const params = queryString.parse(props.location.search)

  if (params.source && params.client_secret) {
    const stripe = window.Stripe(process.env.GATSBY_STRIPE_PUBLIC_KEY)
    stripe
      .retrieveSource({
        id: params.source,
        client_secret: params.client_secret,
      })
      .then(function(result) {
        if (result.error) {
          alert(
            "There was an error with the payment, contact admin@kwaly.be to resolve this issue"
          )
          setpaymentSuccesful(false)
        }
        if (result.source) {
          if (result.source.status === "failed") {
            setpaymentSuccesful(false)
          }
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <Layout>
      <SEO title="Successful order" />
      <section className="bg-white border-b py-8">
        <div className="container mx-auto flex flex-wrap pt-4 pb-12">
          <div className="mx-auto">
            <Delivery></Delivery>
          </div>
          {paymentSuccessful && (
            <div>
              <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
                Order succesfull, Thank you!
              </h1>
              <p className="lg:w-8/12 mx-auto my-8 px-2 text-center">
                You should be receiving an e-mail confirmation from us some time
                soon. In the meantime enjoy some kwaly-t time with your loved
                ones, or your cat, or dog, or lizard (we don't judge)
              </p>
              <div className="w-full mb-4">
                <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
              </div>{" "}
            </div>
          )}

          {paymentSuccessful || (
            <div>
              <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
                Unfortunately something went wrong with your order.
              </h1>
              <p className="lg:w-8/12 mx-auto my-8 px-2 text-center">
                Please contact{" "}
                <a
                  href="mailto:admin@kwaly.be?Subject=Order failed"
                  target="_top"
                  className="underline text-blue-800"
                >
                  admin@kwaly.be
                </a>{" "}
                so we can resolve this issue.
              </p>
              <div className="w-full mb-4">
                <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
              </div>{" "}
            </div>
          )}
        </div>
      </section>
    </Layout>
  )
}
export default Success
