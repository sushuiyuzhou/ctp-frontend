import * as types from "./actionTypes";
import * as redisApi from "../../utils/redis";
import { apiCallError } from "./apiStatusActions";

export function loadResponseMethodSuccess(responseMethod) {
  return { type: types.GET_RESPONSE_METHOD_SUCCESS, responseMethod };
}

export function loadResponseMethod(modelPath) {
  return function(dispatch) {
    return redisApi
      .get(modelPath + ".Rsp.Method")
      .then(res => {
        dispatch(loadResponseMethodSuccess(res.GET));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function loadResponseKeysSuccess(responseKeys) {
  return { type: types.GET_RESPONSE_KEYS_SUCCESS, responseKeys };
}

export function loadResponseKeys(modelPath) {
  return function(dispatch) {
    return redisApi
      .zrangebylex(modelPath + ".Rsp.Keys", "[a", "[z")
      .then(res => {
        dispatch(loadResponseKeysSuccess(res.ZRANGEBYLEX));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
