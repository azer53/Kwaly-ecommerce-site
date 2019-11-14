import React, { useState, useContext } from "react"
import CardSection from "./cardSection"
import { injectStripe } from "react-stripe-elements"
import useForm from "react-hook-form"
import LoadingOverlay from "react-loading-overlay"
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader"
import { GlobalDispatchContext, GlobalStateContext } from "../../context/GlobalContextProvider"
import { handleCreditCardPayment } from "../../utils/paymentService"
import { navigate } from "@reach/router"


function CheckoutForm(props) {
  const ref = React.createRef()
  const { register, handleSubmit, errors, getValues } = useForm()
  const [isLoading, setIsLoading] = useState(false)
  const [loadingText, setloadingText] = useState()
  const [selectedCard, setSelectedCard] = useState("credit");
  const dispatch = useContext(GlobalDispatchContext);
  const state = useContext(GlobalStateContext);

  const updateShipping = () => {
    const formValues = getValues()
    dispatch({ type: "UPDATE_SHIPPING", value: formValues.shipping })
  }

  const onSubmit = async(formData) => {
    setIsLoading(true);
    const body = { uuid: props.uuid, formData: formData, cart: state.cart, selectedCard: selectedCard}
    // update shipping depending on chosen method
    // add metadata to reflect the items in the cart
    // setloadingText("Setting Shipping details");
    // //const paymentIntentResponse = await updatePaymentIntent(state.cart, state.paymentIntentId, formData);

    // if (paymentIntentResponse.status !== 200) {
    //   alert("There was an error intitating your payment. If the problem persists, contact admin@kwaly.be")
    //   setIsLoading(false);
    //   return;
    // }

    setloadingText("Handling payment");
    const payment = await fetch('/.netlify/functions/checkout', {
      method: 'POST',
      body: JSON.stringify(body)
    })
    
    payment.json().then((data)=>{
      if(data.paymentIntent){
          handleCreditCardPayment(data.paymentIntent, props.stripe).then((response)=>{
            if(response.error){
              alert("Woops, something went wrong with your credit card! Try again or contact admin@kwaly.be");
            }
            else{
              navigate("./success");
              dispatch({type: "CLEAR_CART", value: ""});
            }
          })
        }
        if(data.source){
          navigate(data.source.redirect.url);
          dispatch({type: "CLEAR_CART", value: ""});
        }
    })
    setloadingText("Redirecting");
    
    setTimeout(() => {
      setIsLoading(false);
    }, 500); 
  }

  return (
    <LoadingOverlay active={isLoading} spinner={<ClimbingBoxLoader/>} text={loadingText} fadeSpeed={1000} >
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div>
          <h2 className="text-karla-uppercase text-lg font-bold my-4 pb-2 border-b-2">
            Shipping
          </h2>
          <fieldset
            aria-required="true"
            aria-invalid={errors.shipping ? "true" : "false"}
          >
            {errors.shipping && (
              <span className="text-red-500 text-xs italic">
                Please choose a shipping option, for International orders
                contact us below
              </span>
            )}
            <div className="my-1">
              <input
                id="BE"
                onClick={updateShipping}
                name="shipping"
                type="radio"
                value="BE"
                ref={register({ required: true })}
              ></input>
              <label className="pl-2" htmlFor="BE">
                Postal delivery in Belgium + €3.95{" "}
              </label>
            </div>
            <div className="my-1">
              <input
                id="NL"
                onClick={updateShipping}
                name="shipping"
                type="radio"
                value="NL"
                ref={register({ required: true })}
              ></input>
              <label className="pl-2" htmlFor="NL">
                Postal delivery to The Netherlands + €9.00{" "}
              </label>
            </div>
            <div className="my-1">
              <input
                id="SN"
                onClick={updateShipping}
                name="shipping"
                type="radio"
                value="SN"
                ref={register({ required: true })}
              ></input>
              <label className="pl-2" htmlFor="SN">
                Pick Up in Sint-Niklaas - Free
              </label>
            </div>
          </fieldset>
          <p className="italic text-sm text-gray-700">
            for shipping outside of Belgium or The Netherlands please{" "}
            <a
              href="mailto:admin@kwaly.be?Subject=International%20Shipping"
              target="_top"
              className="underline text-blue-800"
            >
              {" "}
              send us an email
            </a>
          </p>
        </div>
        <div>
          <h2 className="text-karla-uppercase text-lg font-bold my-4 pb-2 border-b-2">
            Order Details
          </h2>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                First Name
              </label>
              <input
                name="fName"
                ref={register({ required: true })}
                className={`${
                  errors.fName ? `border-red-500` : ``
                } appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                id="grid-first-name"
                type="text"
                placeholder="Jane"
              />
              {errors.fName && (
                <p className="text-red-500 text-xs italic">
                  Please fill out this field.
                </p>
              )}
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-last-name"
              >
                Last Name
              </label>
              <input
                name="lName"
                ref={register({ required: true })}
                className={`${
                  errors.lName ? `border-red-500` : ``
                } appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                id="grid-last-name"
                type="text"
                placeholder="Doe"
              />
              {errors.lName && (
                <p className="text-red-500 text-xs italic">
                  Please fill out this field.
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-email"
              >
                Email
              </label>
              <input
                name="email"
                ref={register({ required: true, pattern: /^\S+@\S+$/i })}
                className={`${
                  errors.email ? `border-red-500` : ``
                } appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                id="grid-email"
                type="text"
                placeholder="example@domain.com"
              />
              {errors.email && errors.email.type === "required" && (
                <p className="text-red-500 text-xs italic">
                  Please fill out this field.
                </p>
              )}
              {errors.email && errors.email.type === "pattern" && (
                <p className="text-red-500 text-xs italic">
                  Fill in a valid email address.
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-street"
              >
                Street and number
              </label>
              <input
                name="street"
                ref={register({ required: true })}
                className={`${
                  errors.street ? `border-red-500` : ``
                } appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                id="grid-street"
                type="text"
                placeholder="Stationstraat 20"
              />
              {errors.street && errors.street.type === "required" && (
                <p className="text-red-500 text-xs italic">
                  Please fill out this field.
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-postal"
              >
                Postal Code
              </label>
              <input
                name="postal"
                ref={register({ required: true })}
                className={`${
                  errors.postal ? `border-red-500` : ``
                } appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                id="grid-postal"
                type="text"
                placeholder="1000"
              />
              {errors.postal && errors.postal.type === "required" && (
                <p className="text-red-500 text-xs italic">
                  Please fill out this field.
                </p>
              )}
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-city"
              >
                City
              </label>
              <input
                name="city"
                ref={register({ required: true })}
                className={`${
                  errors.city ? `border-red-500` : ``
                } appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                id="grid-city"
                type="text"
                placeholder="Brussels"
              />
              {errors.city && errors.city.type === "required" && (
                <p className="text-red-500 text-xs italic">
                  Please fill out this field.
                </p>
              )}
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-country"
              >
                Country
              </label>
              <select
                name="country"
                ref={register({ required: true })}
                className={`${
                  errors.country ? `border-red-500` : ``
                } appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
              >
                <option>Belgium</option>
                <option>The Netherlands</option>
              </select>
              {errors.country && errors.country.type === "required" && (
                <p className="text-red-500 text-xs italic">
                  Please fill out this field.
                </p>
              )}
            </div>
          </div>
        </div>
        <CardSection reference={ref} errors={errors} setSelectedCard={setSelectedCard} />
      </form>
    </LoadingOverlay>
  )
}

export default injectStripe(CheckoutForm)
