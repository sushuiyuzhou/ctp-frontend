import * as types from "./actionTypes";
import * as redisApi from "../../utils/redis";
import { apiCallError } from "./apiStatusActions";

export function loadModelPathSuccess(modelPath) {
  return { type: types.LOAD_MODEL_PATH_SUCCESS, modelPath };
}

export function loadModelPath() {
  return function(dispatch) {
    return redisApi
      .getModelPath()
      .then(res => {
        dispatch(loadModelPathSuccess(res.GET));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
