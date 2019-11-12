import React, { useContext } from "react"
import {
  GlobalStateContext,
  GlobalDispatchContext,
} from "../context/GlobalContextProvider"
import { navigate } from "gatsby"
import uuid from "uuid/v4"

function Cart(props) {
  const state = useContext(GlobalStateContext)
  const dispatch = useContext(GlobalDispatchContext)

  const checkOut = () => {
    // const body = {}
    // body.items = state.cart.items.map(item => {
    //   return {
    //     sku: item.slug.toLowerCase() + "-" + item.selectedSize.toLowerCase(),
    //     quantity: item.orderQuantity,
    //   }
    // })
    // fetch("/.netlify/functions/checkout", {
    //   method: "POST",
    //   body: JSON.stringify(body),
    //   headers: new Headers({
    //     "Content-Type": "application/json",
    //   }),
    // })
    //   .then(res => {
    //     return res.json()
    //   })
    //   .then(response => {
    //     dispatch({
    //       type: "ADD_PAYMENT_INTENT_ID",
    //       value:  response.paymentIntentId
    //     })
    //     navigate("./payment", {
    //       state: { clientSecret: response.clientSecret },
    //     })
    //   })

            navigate("./payment", {
          state: { uuid: uuid() },
        })
  }

  return (
    <div
      className={`${
        state.cart.items.length > 0 ? `block` : `hidden`
      } absolute md:w-2/6 lg:w-1/6 sm:right-auto right-0 mt-12 bg-gray-200 shadow-lg p-4 sm:-ml-12 sm:mt-10 lg:mt-6 rounded-sm z-50`}
    >
      <button onClick={props.isCartExpanded} className="float-right">
        <svg
          className="fill-current text-gray-800 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm1.41-1.41A8 8 0 1 0 15.66 4.34 8 8 0 0 0 4.34 15.66zm9.9-8.49L11.41 10l2.83 2.83-1.41 1.41L10 11.41l-2.83 2.83-1.41-1.41L8.59 10 5.76 7.17l1.41-1.41L10 8.59l2.83-2.83 1.41 1.41z" />
        </svg>
      </button>
      {state.cart.items.map(item => {
        return (
          <div
            className="border-b-2 pb-2 mt-2"
            key={item.id + "-" + item.selectedSize}
          >
            <div>
              <span className="font-bold text-karla-uppercase">
                {item.title}
              </span>
            </div>
            <div className="my-2">Size: {item.selectedSize}</div>
            <div className="mb-2">
              Quantity: {item.orderQuantity}
              <span className="float-right font-bold">
                €{item.orderQuantity * item.price}
              </span>
            </div>
            <button
              className="text-xs italic hover:underline"
              onClick={() => {
                dispatch({ type: "DELETE_FROM_CART", value: item })
              }}
            >
              Remove item from cart
            </button>
          </div>
        )
      })}
      <div className="mt-1 pt-2">
        Total:{" "}
        <span className="float-right font-bold">€{state.cart.total}</span>
      </div>
      <div className="text-center">
        <button
          onClick={() => checkOut()}
          className="text-karla-uppercase p-4 shadow-xl my-4 bg-gray-600 text-gray-100 hover:underline"
        >
          CHECK OUT
        </button>
      </div>
    </div>
  )
}

export default Cart
