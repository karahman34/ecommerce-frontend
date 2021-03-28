import { SET_LOGGED_IN, SET_USER } from "./actionTypes";

import authState from './state'

export default function authReducer(state = authState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload
      }

    case SET_LOGGED_IN:
      return {
        ...state,
        loggedIn: action.payload,
      }
  
    default:
      return state
  }
}