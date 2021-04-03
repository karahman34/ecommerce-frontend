import { ADD_CART, REMOVE_CART, SET_CARTS } from "./actionTypes";
import cartApi from "api/cartApi";

export const setCarts = (carts) => ({
  type: SET_CARTS,
  payload: carts,
});

export const addCart = (cart) => ({
  type: ADD_CART,
  payload: cart,
});

export const removeCart = (cart) => ({
  type: REMOVE_CART,
  payload: cart,
});

export const fetchUserCarts = () => {
  return async (dispatch) => {
    try {
      const res = await cartApi.fetchUserCarts();
      const { data } = res.data;

      dispatch(setCarts(data));

      return Promise.resolve(res);
    } catch (err) {
      return Promise.reject(err);
    }
  };
};
