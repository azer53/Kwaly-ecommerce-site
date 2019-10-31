import React from "react"

export const GlobalStateContext = React.createContext()
export const GlobalDispatchContext = React.createContext()

const initialState = {
  cart: []
}

function reducer(state, action) {
  switch (action.type) {

    case "ADD_TO_CART": {
      var item = state.cart.find((item) => item.id == action.value.id && item.selectedSize == action.value.selectedSize);
      if (item != undefined) {
        var index = state.cart.indexOf(item)
        state.cart[index].orderQuantity += action.value.orderQuantity;
      }
      else {
        state.cart = state.cart.concat(action.value);
      }

      calcTotals(state.cart);
      return {
        ...state
      }
    }

    case "UPDATE_CART": {
      break
    }
    case "DELETE_FROM_CART": {
      var item = state.cart.find((item) => item.id == action.value.id && item.selectedSize == action.value.selectedSize);
      var index = state.cart.indexOf(item)
      state.cart[index].orderQuantity -= 1;

      if (state.cart[index].orderQuantity == 0)
        state.cart.splice(index, 1);

      calcTotals(state.cart)
      return { ...state }
    }
    default:
      throw new Error("Bad Action Type")
  }
}

const sumPrice = (cart) => { return cart.reduce((a, b) => a + ((b['price'] * b['orderQuantity']) || 0), 0) }
const calcTotals = (cart) => {
  cart.total = sumPrice(cart);
  cart.totalItems = cart.reduce((a, b) => a + (b['orderQuantity'] || 0), 0)
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