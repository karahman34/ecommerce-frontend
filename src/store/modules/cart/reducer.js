import {
  ADD_CART,
  CLEAR_CART,
  REMOVE_CART,
  SET_CARTS,
  UPDATE_CART,
} from "./actionTypes";
import cartState from "./state";

let newCartItems = [];

export const findByProductId = (state = cartState) => (productId) =>
  !Array.isArray(state.items)
    ? null
    : state.items.find((cart) => cart.product.id === productId);

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
        items: [...state.items, payload],
      };

    case UPDATE_CART:
      newCartItems = [...state.items];
      newCartItems.splice(
        newCartItems.findIndex((cart) => cart.id === payload.id),
        1,
        payload
      );

      return {
        ...state,
        items: newCartItems,
      };

    case REMOVE_CART:
      newCartItems = [...state.items];
      newCartItems.splice(
        newCartItems.findIndex((cart) => cart.id === payload.id),
        1
      );

      return {
        ...state,
        items: newCartItems,
      };

    case CLEAR_CART:
      return {
        ...state,
        items: [],
      };

    default:
      return state;
  }
};

export default cartReducer;
