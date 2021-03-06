import authApi from "api/authApi";
import profileApi from "api/profileApi";
import { SET_USER, SET_LOGGED_IN } from "./actionTypes";

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const setLoggedIn = (value) => ({
  type: SET_LOGGED_IN,
  payload: value,
});

export function authenthicate(payload) {
  return async (dispatch) => {
    try {
      await authApi.getCSRF();
      await authApi.login(payload);

      await dispatch(getMe());
      dispatch(setLoggedIn(true));

      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  };
}

export function register(payload) {
  return async (dispatch) => {
    try {
      await authApi.register(payload);

      await dispatch(getMe());
      dispatch(setLoggedIn(true));

      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  };
}

export function logout() {
  return async () => {
    try {
      const res = await authApi.logout();

      window.location.href = "/login";

      return Promise.resolve(res);
    } catch (err) {
      return Promise.reject(err);
    }
  };
}

export function getMe() {
  return async (dispatch) => {
    try {
      const res = await authApi.me();
      const { data } = res.data;

      dispatch(setUser(data));

      return Promise.resolve(res);
    } catch (err) {
      return Promise.reject(err);
    }
  };
}

export function updateUserInfo(payload) {
  return async (dispatch) => {
    try {
      const res = await profileApi.update(payload);
      const { data } = res.data;

      dispatch(setUser(data));

      return Promise.resolve(res);
    } catch (err) {
      return Promise.reject(err);
    }
  };
}
