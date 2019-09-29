import * as types from "./actionTypes";
import * as redisApi from "../../utils/redis";
import { apiCallError } from "./apiStatusActions";

export function changeUpdateStatus() {
  return { type: types.WAIT_FOR_UPDATE };
}

export function getUpdateFromModel() {
  return { type: types.GET_UPDATE_FROM_MODEL };
}

export function loadModelUpdate(key) {
  return function(dispatch) {
    return redisApi
      .subscribe(key)
      .then(() => {
        dispatch(getUpdateFromModel());
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
