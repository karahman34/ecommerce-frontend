import { SET_LAYOUT } from "./actionTypes";

export const setLayout = (name) => ({
  type: SET_LAYOUT,
  payload: name,
});
