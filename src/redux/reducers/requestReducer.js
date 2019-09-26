import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function requestReducer(state = initialState.request, action) {
  switch (action.type) {
    case types.GET_REQUEST_ID_SUCCESS:
      return { ...state, requestID: action.requestID };
    case types.GET_REQUEST_METHOD_SUCCESS:
      return { ...state, requestMethod: action.requestMethod };
    default:
      return state;
  }
}
