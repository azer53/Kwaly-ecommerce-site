import React from "react"
import { Redirect } from '@reach/router';
import Layout from "../components/layout"
import SEO from "../components/seo"
import { StripeProvider, Elements } from 'react-stripe-elements';
import InjectedCheckoutForm from '../components/stripe/checkoutForm'
import CheckoutSummary from "../components/checkoutSummary";


const PaymentPage = (props) => {


    if (!props.location.state || !props.location.state.uuid) {
        return (
            <Redirect to="/shop" noThrow />
        )
    }

    return (
        <Layout>
            <SEO title="Payment" />
            <StripeProvider apiKey={process.env.GATSBY_STRIPE_PUBLIC_KEY}>
                <section className="bg-white border-b py-8">
                    <div className="container mx-auto flex flex-wrap pt-4 pb-12">
                        <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800 text-karla-uppercase">Checkout</h1>
                    </div>
                    <div className="">
                        <Elements>
                            <div className="flex flex-col md:flex-row mx-auto w-10/12 xl:w-8/12">
                                <div className="flex md:w-1/3 pr-6 rounded shadow-xl bg-gray-100 p-8 mb-6 md:mb-0 md:mr-6 table">
                                    <CheckoutSummary></CheckoutSummary>
                                </div>
                                <div className="flex md:w-2/3">
                                    <InjectedCheckoutForm clientSecret={props.location.state.uuid} />
                                </div>
                            </div>
                        </Elements>
                    </div>
                </section>
            </StripeProvider>


        </Layout >
    )
}
export default PaymentPage
