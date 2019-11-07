import React, { useState, useContext } from "react"
import { CardElement } from "react-stripe-elements"
import { GlobalStateContext } from "../../context/GlobalContextProvider"
import { navigate } from "@reach/router"

export default function CardSection(props) {
  const [isCreditSelected, setIsCreditSelected] = useState(true)
  const [isDebitSelected, setIsDebitSelected] = useState(false)
  const [displayError, setDisplayError] = useState("")
  const state = useContext(GlobalStateContext)
  const ref = props.reference

  const addEventListener = element => {
    element.addEventListener("change", function(event) {
      if (event.error) {
        setDisplayError(event.error.message)
      } else {
        setDisplayError("")
      }
    })
  }
  const handleBancontact = (event) => {
      event.preventDefault();
    props.stripe
      .createSource({
        type: "bancontact",
        amount: 1099,
        currency: "eur",
        owner: {
          name: "Jenny Rosen",
        },
        redirect: {
          return_url: "https://localhost:8000/success",
        },
      })
      .then(function(result) {
        navigate(result.source.redirect.url)
      })
  }

  return (
    <div>
      <h2 className="text-karla-uppercase text-lg font-bold my-4 pb-2 border-b-2">
        Card Details
      </h2>
      <fieldset>
        <div className="my-1">
          <input
            name="cardOption"
            checked={isCreditSelected}
            onChange={() => {
              setIsCreditSelected(!isCreditSelected)
              setIsDebitSelected(!isDebitSelected)
            }}
            value="credit"
            type="radio"
            id="creditCard"
          />
          <label className="pl-2" htmlFor="creditCard">
            Pay by credit card (VISA, Master Card,...)
          </label>
        </div>
        <div className="my-1">
          <input
            name="cardOption"
            checked={isDebitSelected}
            onChange={() => {
              setIsCreditSelected(!isCreditSelected)
              setIsDebitSelected(!isDebitSelected)
            }}
            value="debit"
            type="radio"
            id="debitCard"
          />
          <label className="pl-2" htmlFor="debitCard">
            Pay by debit card (Maestro)
          </label>
        </div>
      </fieldset>
      <div
        className={`${
          isCreditSelected ? `block` : `hidden`
        } shadow-xl p-2 my-4`}
      >
        <CardElement
          ref={ref}
          onReady={el => {
            addEventListener(el)
          }}
          style={{ base: { fontSize: "18px" } }}
        />
        <p>
          <span
            className={`${
              displayError ? `block` : `hidden`
            } my-2 text-red-500 text-xs italic`}
          >
            {displayError}
          </span>
        </p>
      </div>
      <div
        className={`${
          isDebitSelected ? `block` : `hidden`
        } md:w-1/2 shadow-xl p-2 my-4`}
      >
        <button onClick={handleBancontact}>
          Pay €{state.cart.total} with Bancontact
        </button>
      </div>
    </div>
  )
}
