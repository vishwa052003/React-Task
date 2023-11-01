
import * as types from "./Type";

export function addUser(data) {
  return {
    type: types.CREATE_SUCCESS,
    payload: data,
  };
}

export function getUser() {
  return {
    type: types.GET_SUCCESS,
  };
}

export function getidUser(id) {
  return {
    type: types.GETID_SUCCESS,
    payload: id,
  };
}

export function updateUser(data) {
  return {
    type: types.UPDATE_SUCCESS,
    payload: data,
  };
}

export function deleteUser(data) {
  return {
    type: types.DELETE_SUCCESS,
    payload: data,
  };
}
