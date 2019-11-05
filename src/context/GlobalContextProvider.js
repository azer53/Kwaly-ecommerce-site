import React from "react"

export const GlobalStateContext = React.createContext()
export const GlobalDispatchContext = React.createContext()

const initialState = {
  cart: [],
  paymentIntentId: 0,
}

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      var item = state.cart.find(
        item =>
          item.id == action.value.id &&
          item.selectedSize == action.value.selectedSize
      )
      if (item != undefined) {
        var index = state.cart.indexOf(item)
        state.cart[index].orderQuantity += action.value.orderQuantity
      } else {
        state.cart = state.cart.concat(action.value)
      }

      calcTotals(state.cart)
      return {
        ...state,
      }
    }
    case "DELETE_FROM_CART": {
      var item = state.cart.find(
        item =>
          item.id == action.value.id &&
          item.selectedSize == action.value.selectedSize
      )
      var index = state.cart.indexOf(item)
      state.cart[index].orderQuantity -= 1

      if (state.cart[index].orderQuantity == 0) state.cart.splice(index, 1)

      calcTotals(state.cart)
      return { ...state }
    }
    case "UPDATE_SHIPPING":
      // send shipping update to netlify shipping service
      //updateShipping(action.value, state.paymentIntentId, state.cart)
      state.cart.shippingOption = action.value
      switch (action.value) {
        case "BE":
          state.cart.shippingPrice = 5
          break
        case "NL":
          state.cart.shippingPrice = 9
          break
        case "SN":
          state.cart.shippingPrice = 0
          break
      }
      calcTotals(state.cart)
      return { ...state }

    case "ADD_PAYMENT_INTENT_ID": {
      state.paymentIntentId = action.value
      return { ...state }
    }
    default:
      throw new Error("Bad Action Type")
  }
}

const sumPrice = cart => {
  return cart.reduce((a, b) => a + (b["price"] * b["orderQuantity"] || 0), 0)
}
const calcTotals = cart => {
  // calculate total price
  cart.total = sumPrice(cart)
  if (cart.shippingPrice != undefined) {
    cart.total += cart.shippingPrice
  }

  //calculate total items in cart
  cart.totalItems = cart.reduce((a, b) => a + (b["orderQuantity"] || 0), 0)
}

// const updateShipping = (shippingOption, paymentIntentId, cart) => {
//   fetch("http://localhost:8000/.netlify/functions/updateshipping", {
//     method: "POST",
//     body: JSON.stringify({
//       shippingOption: shippingOption,
//       paymentIntentId: paymentIntentId,
//     }),
//     headers: new Headers({
//       "Content-Type": "application/json",
//     }),
//   })
//     .then(data => {
//       data.json()
//     })
//     .then(result => {
//       cart.shippingPrice = result.shippingPrice;
//       calcTotals(cart)
//     })
// }

const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  )
}

export default GlobalContextProvider
