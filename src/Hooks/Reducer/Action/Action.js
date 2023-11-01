import * as types from '../Action/Type';

export const actionTypes = {
  SET_FIELD: "SET_FIELD",
  SET_ERRORS: "SET_ERRORS",
  SET_IS_EDITING: "SET_IS_EDITING",
  SET_LOADING: "SET_LOADING",
};

 // Addemployee


export function addEmployeeRequest(data){
  return {
    type:types.CREATE_REQUEST,
    payload:data
  }
}

export function addEmployeeSuccess(data){
  return {
    type:types.CREATE_SUCCESS,
    payload:data
  }
}
export function addEmployeeError(data){
  return {
    type:types.CREATE_ERROR,
    payload:data
  }
}

// getemployee

export function getEmployeeRequest(){
  return {
    type:types.GET_REQUEST,
  }
}


export function getEmployeeSuccess(data){
  return {
    type:types.GET_SUCCESS,
    payload:data
  }
}

export function getEmployeeError(data){
  return {
    type:types.GET_ERROR,
    payload:data
  }
}

// getidemmployee

export function getidEmployeeRequest(data){
  return {
    type:types.GETID_REQUEST,
    payload:data
  }
}


export function getidEmployeeSuccess(data){
  return {
    type:types.GETID_SUCCESS,
    payload:data
  }
}


export function getidEmployeeError(data){
  return {
    type:types.GETID_ERROR,
    payload:data
  }
}

// Updateemployee
export function updateEmployeeRequest(data){
  return {
    type:types.UPDATE_REQUEST,
    payload:data
  }
}

export function updateEmployeeSuccess(data){
  return {
    type:types.UPDATE_SUCCESS,
    payload:data
  }
}

export function updateEmployessError(data){
  return {
    type:types.UPDATE_ERROR,
    payload:data
  }
}
// Deleteemployee

export function deleteEmployeeRequest(data){
  return {
    type:types.DELETE_SUCCESS,
    payload:data
  }
}

export function deleteEmployeeSuccess(data){
  return {
    type:types.DELETE_SUCCESS,
    payload:data
  }
}


export function deleteEmployeeError(data){
  return {
    type:types.DELETE_ERROR,
    payload:data
  }
}