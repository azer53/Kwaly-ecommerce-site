import React from "react"
import { Redirect } from '@reach/router';
import Layout from "../components/layout"
import SEO from "../components/seo"
import { StripeProvider } from 'react-stripe-elements';
import { Elements } from 'react-stripe-elements';
import AddressSection from "../components/stripe/addressSection"
import CardSection from "../components/stripe/cardSection"
//import ShippingSection from "../components/stripe/shippingSection"
import useForm from 'react-hook-form'

const PaymentPage = (props) => {
    const { register, handleSubmit, watch, errors } = useForm()

    if (!props.location.state.paymentIntentId) {
        return (
            <Redirect to="/shop" noThrow />
        )
    }

    const onSubmit = data => {
        console.log(data);
        console.log(errors);
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
                            <form onSubmit={handleSubmit(onSubmit)} className="mx-auto w-10/12 sm:w-8/12">
                                <div >
                                    <h2 className="text-karla-uppercase text-lg font-bold my-4 pb-2 border-b-2">Shipping</h2>
                                    <fieldset aria-required="true" aria-invalid={errors.Shipping ? 'true' : 'false'}>
                                        {errors.Shipping && <span className="text-red-500 text-xs italic">Please choose a shipping option, for International orders contact us below</span>}
                                        <div className="my-1">
                                            <input id="BE" name="Shipping" type="radio" value="BE" ref={register({ required: true })}></input>
                                            <label className="pl-2" htmlFor="BE">Postal delivery in Belgium + €5.00 </label>
                                        </div>
                                        <div className="my-1">
                                            <input id="NL" name="Shipping" type="radio" value="NL" ref={register({ required: true })}></input>
                                            <label className="pl-2" htmlFor="NL">Postal delivery to The Netherlands + €9.00 </label>
                                        </div>
                                        <div className="my-1">
                                            <input id="SN" name="Shipping" type="radio" value="SN" ref={register({ required: true })}></input>
                                            <label className="pl-2" htmlFor="SN">Pick Up in Sint-Niklaas - Free</label>
                                        </div>
                                    </fieldset>
                                    <p className="italic text-sm text-gray-700">for shipping outside of Belgium or The Netherlands please <a href="mailto:admin@kwaly.be?Subject=International%20Shipping" target="_top" className="underline text-blue-800"> send us an email</a></p>
                                </div>
                                <div>
                                    <h2 className="text-karla-uppercase text-lg font-bold my-4 pb-2 border-b-2">Order Details</h2>
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                                First Name
                                            </label>
                                            <input name="fName" ref={register({ required: true })} className={`${errors.fName ? `border-red-500` : `` } appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`} id="grid-first-name" type="text" placeholder="Jane" />
                                            {errors.fName && <p className="text-red-500 text-xs italic">Please fill out this field.</p>}
                                        </div>
                                        <div className="w-full md:w-1/2 px-3">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                                Last Name
                                            </label>
                                            <input name="lName" ref={register({ required: true })} className={`${errors.lName ? `border-red-500` : `` } appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`} id="grid-last-name" type="text" placeholder="Doe" />
                                            {errors.lName && <p className="text-red-500 text-xs italic">Please fill out this field.</p>}
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full px-3 mb-6 md:mb-0">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-email">
                                                Email
                                            </label>
                                            <input name="email" ref={register({ required: true , pattern: /^\S+@\S+$/i})} className={`${errors.email ? `border-red-500` : `` } appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`} id="grid-email" type="text" placeholder="example@domain.com" />
                                            {errors.email && errors.email.type === "required" && <p className="text-red-500 text-xs italic">Please fill out this field.</p>}
                                            {errors.email && errors.email.type ==="pattern" && <p className="text-red-500 text-xs italic">Fill in a valid email address.</p>}
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full px-3 mb-6 md:mb-0">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-street">
                                                Street and number
                                            </label>
                                            <input name="street" ref={register({ required: true})} className={`${errors.street ? `border-red-500` : `` } appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`} id="grid-street" type="text" placeholder="Stationstraat 20" />
                                            {errors.street && errors.street.type === "required" && <p className="text-red-500 text-xs italic">Please fill out this field.</p>}
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-postal">
                                                Postal Code
                                            </label>
                                            <input name="postal" ref={register({ required: true})} className={`${errors.postal ? `border-red-500` : `` } appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`} id="grid-postal" type="text" placeholder="1000" />
                                            {errors.postal && errors.postal.type === "required" && <p className="text-red-500 text-xs italic">Please fill out this field.</p>}
                                        </div>
                                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                                                City
                                            </label>
                                            <input name="city" ref={register({ required: true})} className={`${errors.city ? `border-red-500` : `` } appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`} id="grid-city" type="text" placeholder="Brussels" />
                                            {errors.city && errors.city.type === "required" && <p className="text-red-500 text-xs italic">Please fill out this field.</p>}
                                        </div>
                                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-country">
                                                Country
                                            </label>
                                            <select name="country" ref={register({ required: true})} className={`${errors.country ? `border-red-500` : `` } appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`} >
                                                <option>Belgium</option>
                                                <option>The Netherlands</option>
                                            </select>
                                            {errors.country && errors.country.type === "required" && <p className="text-red-500 text-xs italic">Please fill out this field.</p>}
                                        </div>
                                    </div>
                                </div>
                                <CardSection />
                                <button disabled={Object.keys(errors).length > 0} className={`${Object.keys(errors).length > 0 ? `bg-gray-500` : `bg-green-700 hover:bg-green-800`} text-karla-uppercase border rounded text-gray-100 p-4 my-4`}>Confirm order</button>
                            </form>
                        </Elements>
                    </div>
                </section>
            </StripeProvider>


        </Layout >
    )
}
export default PaymentPage
