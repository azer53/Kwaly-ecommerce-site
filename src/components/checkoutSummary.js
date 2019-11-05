import React, { useContext } from "react"
import { GlobalStateContext } from "../context/GlobalContextProvider"

export default function CheckoutSummary() {
  const state = useContext(GlobalStateContext)

  return (
    <div className="">
      <h2 className="text-karla-uppercase text-lg font-bold my-4 pb-2 border-b-2">
        Summary
      </h2>
      {state.cart.map(item => {
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
              Quantity: {item.orderQuantity}{" "}
              <span className="float-right font-bold">
                {" "}
                € {item.orderQuantity * item.price}
              </span>
            </div>
          </div>
        )
      })}
      {state.cart.shippingPrice != undefined && (
        <div className="my-2">Selected shipping option <span className="float-right font-bold">€ {state.cart.shippingPrice}</span></div>
      )}

      <div className="mt-1 pt-2 text-2xl">
        Total:{" "}
        <span className="float-right font-bold">€{state.cart.total}</span>
      </div>
    </div>
  )
}
