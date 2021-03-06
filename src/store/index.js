import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import authReducer from "./modules/auth/reducer";
import cartReducer from "./modules/cart/reducer";
import globalReducer from "./modules/global/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  global: globalReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
