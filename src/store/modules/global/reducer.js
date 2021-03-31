import globalState from "./state";
import { SET_LAYOUT } from "./actionTypes";

const globalReducer = (state = globalState, { type, payload }) => {
  switch (type) {
    case SET_LAYOUT:
      return {
        ...state,
        currentLayout: payload,
      };

    default:
      return state;
  }
};

export default globalReducer;
