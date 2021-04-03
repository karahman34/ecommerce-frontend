import { ADD_CART, REMOVE_CART, SET_CARTS } from "./actionTypes";
import cartState from "./state";

const cartReducer = (state = cartState, { type, payload }) => {
  switch (type) {
    case SET_CARTS:
      return {
        ...state,
        items: payload,
      };

    case ADD_CART:
      return {
        ...state,
        items: [...state, payload],
      };

    case REMOVE_CART:
      const newCartItems = [...state.items];
      newCartItems.splice(
        newCartItems.findIndex((cart) => cart.id === payload.id),
        1
      );

      return {
        ...state,
        items: newCartItems,
      };

    default:
      return state;
  }
};

export default cartReducer;
