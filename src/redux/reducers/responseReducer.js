import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function requestReducer(state = initialState.response, action) {
  switch (action.type) {
    case types.GET_RESPONSE_METHOD_SUCCESS:
      return { ...state, responseMethod: action.responseMethod };
    case types.GET_RESPONSE_KEYS_SUCCESS:
      return { ...state, responseKeys: action.responseKeys };
    default:
      return state;
  }
}
