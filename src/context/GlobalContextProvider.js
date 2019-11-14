import React from "react"
export const GlobalStateContext = React.createContext()
export const GlobalDispatchContext = React.createContext()

const storage = typeof window !== "undefined" && JSON.parse(localStorage.getItem("state"));
const initialState = storage || {
  order: {},
  cart: { items: [] },
  paymentIntentId: 0,
};

function reducer(state, action) {
  /*eslint default-case: ["off", { "commentPattern": "^skip\\sdefault" }]*/

  switch (action.type) {
    case "ADD_TO_CART": {
      // find item in list and raise quantity by 1, otherwise add new obj
      let item = state.cart.items.find(item => item.sku === action.value.sku)

      if (item !== undefined) {
        let index = state.cart.items.indexOf(item)
        state.cart.items[index].orderQuantity += action.value.orderQuantity
      } else {
        state.cart.items = state.cart.items.concat(action.value)
      }

      calcTotals(state.cart)
      updateLocalStorage(state)
      return {
        ...state,
      }
    }
    case "DELETE_FROM_CART": {
      let indexOfItem = state.cart.items.findIndex(i => {
        return i.sku === action.value.sku
      })

      state.cart.items[indexOfItem].orderQuantity -= 1
      if (state.cart.items[indexOfItem].orderQuantity === 0)
        state.cart.items.splice(indexOfItem, 1)

      calcTotals(state.cart)
      updateLocalStorage(state)
      return { ...state }
    }
    case "UPDATE_SHIPPING":
      // send shipping update to netlify shipping service
      //updateShipping(action.value, state.paymentIntentId, state.cart)
      state.cart.shippingOption = action.value
      switch (action.value) {
        case "BE":
          state.cart.shippingPrice = 3.95
          break
        case "NL":
          state.cart.shippingPrice = 7
          break
        case "SN":
          state.cart.shippingPrice = 0
          break
      }
      calcTotals(state.cart)
      updateLocalStorage(state)
      return { ...state }

    case "CREATE_ORDER":
      const body = {}
      body.data = action.value
      body.cart = state.cart
      fetch("/.netlify/functions/createOrder", {
        method: "POST",
        body: JSON.stringify(body),
      })
        .then(data => {
          return data.json()
        })
        .then(order => {
          state.order = order
        })

      return { ...state }
    case "ADD_PAYMENT_INTENT_ID": {
      state.paymentIntentId = action.value
      updateLocalStorage(state)
      return { ...state }
    }
    case "CLEAR_CART": {
      state.cart = { items: [] }
      localStorage.removeItem("state")
      return { ...state }
    }
    default: {
      throw new Error("Bad Action Type")
    }
  }
}

const sumPrice = items => {
  return items.reduce((a, b) => a + (b["price"] * b["orderQuantity"] || 0), 0)
}
const calcTotals = cart => {
  // calculate total price
  cart.total = sumPrice(cart.items)
  if (cart.shippingPrice !== undefined) {
    cart.total += cart.shippingPrice
  }

  //calculate total items in cart
  cart.totalItems = cart.items.reduce(
    (a, b) => a + (b["orderQuantity"] || 0),
    0
  )
}

const updateLocalStorage = state => {
  if (typeof window !== "undefined") {
    localStorage.setItem("state", JSON.stringify(state))
  }
}

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
