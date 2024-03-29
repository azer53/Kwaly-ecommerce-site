import React, { useState, useContext } from "react"
import { CardElement } from "react-stripe-elements"
import { GlobalStateContext } from "../../context/GlobalContextProvider"
import VisaLogo from "../../components/images/visaLogo"
import MasterCardLogo from "../../images/mastercardLogo.svg"
import BancontactLogo from "../../images/bancontact-logo.svg"

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

  const onChange = event => {
    props.setSelectedCard(event.target.value)
  }

  return (
    <div>
      <h2 className="text-karla-uppercase text-lg font-bold my-4 pb-2 border-b-2">
        Card Details
      </h2>
      <fieldset>
        <div className="flex content-center my-4">
          <div>
            <input
              name="cardOption"
              checked={isCreditSelected}
              onClick={onChange}
              onChange={() => {
                setIsCreditSelected(!isCreditSelected)
                setIsDebitSelected(!isDebitSelected)
              }}
              value="credit"
              type="radio"
              id="creditCard"
            />
          </div>
          <div className="inline-block">
            <label className="pl-2" htmlFor="creditCard">
              Pay by credit card (VISA, Master Card,...)
            </label>
          </div>
          <div className="w-40 inline-block">
            <div className="w-8 mx-4 inline-block">
              <VisaLogo></VisaLogo>
            </div>
            <div className="w-8 mx-4 inline-block">
              <MasterCardLogo></MasterCardLogo>
            </div>
          </div>
        </div>

        <div className="my-1 flex content-center">
          <div>
            <input
              name="cardOption"
              checked={isDebitSelected}
              onClick={onChange}
              onChange={() => {
                setIsCreditSelected(!isCreditSelected)
                setIsDebitSelected(!isDebitSelected)
              }}
              value="bancontact"
              type="radio"
              id="debitCard"
            />
          </div>
          <div>
            <label className="pl-2" htmlFor="debitCard">
              Pay with Bancontact
            </label>
          </div>
          <div className="w-8 mx-4">
            <BancontactLogo></BancontactLogo>
          </div>
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

      <div>
        <button
          disabled={Object.keys(props.errors).length > 0}
          className={`${
            Object.keys(props.errors).length > 0
              ? `bg-gray-500`
              : `bg-green-700 hover:bg-green-800`
          } text-karla-uppercase border rounded text-gray-100 p-4 my-4`}
        >
          Pay €{state.cart.total}
          {isDebitSelected && " with Bancontact"}
          {isCreditSelected && " with Credit Card"}
        </button>
      </div>
    </div>
  )
}
