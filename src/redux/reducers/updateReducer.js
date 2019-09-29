import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function updateReducer(
  state = initialState.updateAvailable,
  action
) {
  switch (action.type) {
    case types.GET_UPDATE_FROM_MODEL:
      return { ...state, updateAvailable: true };
    case types.WAIT_FOR_UPDATE:
      return { ...state, updateAvailable: false };
    default:
      return state;
  }
}
