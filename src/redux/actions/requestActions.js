import * as types from "./actionTypes";
import * as redisApi from "../../utils/redis";
import { apiCallError } from "./apiStatusActions";

export function loadRequestIDSuccess(requestID) {
  return { type: types.GET_REQUEST_ID_SUCCESS, requestID };
}

export function loadRequestID(modelPath) {
  return function(dispatch) {
    return redisApi
      .get(modelPath + ".Req.nRequestID")
      .then(res => {
        dispatch(loadRequestIDSuccess(res.GET));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function loadRequestMethodSuccess(requestMethod) {
  return { type: types.GET_REQUEST_METHOD_SUCCESS, requestMethod };
}

export function loadRequestMethod(modelPath) {
  return function(dispatch) {
    return redisApi
      .get(modelPath + ".Req.Method")
      .then(res => {
        dispatch(loadRequestMethodSuccess(res.GET));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
