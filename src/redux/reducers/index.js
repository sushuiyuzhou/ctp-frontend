import { combineReducers } from "redux";
import modelPath from "./pathReducer";
import request from "./requestReducer";
import response from "./responseReducer";
import updateAvailable from "./updateReducer";

const rootReducer = combineReducers({
  modelPath,
  request,
  response,
  updateAvailable
});

export default rootReducer;
