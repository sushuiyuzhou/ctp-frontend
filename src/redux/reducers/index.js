import { combineReducers } from "redux";
import modelPath from "./pathReducer";
import request from "./requestReducer";

const rootReducer = combineReducers({
  modelPath,
  request
});

export default rootReducer;
