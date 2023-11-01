import * as types from "./SagaType";

export function addUserRequest(data) {
  return {
    type: types.CREATEUSER_REQUEST,
    payload: data,
  };
}

export function addUserSuccess(data) {
  return {
    type: types.CREATEUSER_SUCCESS,
    payload: data,
  };
}

export function addUserError(data) {
  return {
    type: types.CREATEUSER_ERROR,
    payload: data,
  };
}

export function getUserRequest() {
  return {
    type: types.GETUSER_REQUEST,
    // payload:data
  };
}

export function getUserSuccess(data) {
  return {
    type: types.GETUSER_SUCCESS,
    payload: data,
  };
}
export function getUserError(data) {
  return {
    type: types.GETUSER_ERROR,
    payload: data,
  };
}

export function getidUserRequest(id) {
  return {
    type: types.GETIDUSER_REQUEST,
    payload: id,
  };
}

export function getidUserSuccess(data) {
  return {
    type: types.GETIDUSER_SUCCESS,
    payload: data,
  };
}

export function getidUserError(data) {
  return {
    type: types.GETIDUSER_ERROR,
    payload: data,
  };
}

export function updateUserRequest(data) {
  return {
    type: types.UPDATEUSER_REQUEST,
    payload: data,
  };
}

export function updateUserSuccess(data) {
  return {
    type: types.UPDATEUSER_SUCCESS,
    payload: data,
  };
}

export function updateUserError(data) {
  return {
    type: types.UPDATEUSER_ERROR,
    payload: data,
  };
}

export function deleteUserRequest(data) {
  return {
    type: types.DELETEUSER_REQUEST,
    payload: data,
  };
}

export function deleteUserSuccess(data) {
  return {
    type: types.DELETEUSER_SUCCESS,
    payload: data,
  };
}

export function deleteUserError(data) {
  return {
    type: types.DELETEUSER_ERROR,
    payload: data,
  };
}