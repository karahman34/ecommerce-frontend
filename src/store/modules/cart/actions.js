import {
  ADD_CART,
  CLEAR_CART,
  REMOVE_CART,
  SET_CARTS,
  UPDATE_CART,
} from "./actionTypes";
import cartApi from "api/cartApi";

export const setCarts = (carts) => ({
  type: SET_CARTS,
  payload: carts,
});

export const addCart = (cart) => ({
  type: ADD_CART,
  payload: cart,
});

export const updateCart = (cart) => ({
  type: UPDATE_CART,
  payload: cart,
});

export const removeCart = (cart) => ({
  type: REMOVE_CART,
  payload: cart,
});

export const clearCart = () => ({
  type: CLEAR_CART,
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

export const saveCartItem = (payload) => {
  return async (dispatch) => {
    try {
      const res = await cartApi.store(payload);
      const { data } = res.data;

      dispatch(addCart(data));

      return Promise.resolve(res);
    } catch (err) {
      return Promise.reject(err);
    }
  };
};

export const updateCartItem = (cart, payload) => {
  return async (dispatch) => {
    try {
      const res = await cartApi.update(cart.id, payload);
      const { data } = res.data;

      dispatch(updateCart(data));

      return Promise.resolve(res);
    } catch (err) {
      return Promise.reject(err);
    }
  };
};

export const removeCartItem = (cart) => {
  return async (dispatch) => {
    try {
      const res = await cartApi.delete(cart.id);

      dispatch(removeCart(cart));

      return Promise.resolve(res);
    } catch (err) {
      return Promise.reject(err);
    }
  };
};
