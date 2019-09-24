import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function pathReducer(state = initialState.modelPath, action) {
  switch (action.type) {
    case types.LOAD_MODEL_PATH_SUCCESS:
      return action.modelPath;
    default:
      return state;
  }
}
