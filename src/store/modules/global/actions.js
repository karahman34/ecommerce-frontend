import categoryApi from "api/categoryApi";
import { SET_LAYOUT, SET_POPULAR_CATEGORIES } from "./actionTypes";

export const setLayout = (name) => ({
  type: SET_LAYOUT,
  payload: name,
});

export const setPopularCategories = (categories) => ({
  type: SET_POPULAR_CATEGORIES,
  payload: categories,
});

export const fetchPopularCategories = (params) => {
  return async (dispatch) => {
    try {
      const res = await categoryApi.popular(params);
      const { data } = res.data;

      dispatch(setPopularCategories(data));

      return Promise.resolve(res);
    } catch (err) {
      return Promise.reject(err);
    }
  };
};
