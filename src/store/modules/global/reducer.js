import globalState from "./state";
import { SET_LAYOUT, SET_POPULAR_CATEGORIES } from "./actionTypes";

const globalReducer = (state = globalState, { type, payload }) => {
  switch (type) {
    case SET_LAYOUT:
      return {
        ...state,
        currentLayout: payload,
      };

    case SET_POPULAR_CATEGORIES:
      return {
        ...state,
        popularCategories: payload,
      };

    default:
      return state;
  }
};

export default globalReducer;
