import { put, takeLatest, call } from "redux-saga/effects";

import { 
  createUser ,
  getUser,
   getUsers,
  updateuser, 
  deleteUser ,
} from "../Service/Mockapi";
import * as types from "../Component/SagaGallary/SagaType";
import {
  addUserSuccess,
  addUserError,
  getUserSuccess,
  getUserError,
  getidUserSuccess,
  getidUserError,
  updateUserSuccess,
  updateUserError,
  deleteUserSuccess,
  deleteUserError,
  getUserRequest,
} from "../Component/SagaGallary/SagaAction";
export function* postData({ payload }) {
  try {
    const response = yield call(createUser, payload);
    if (response.status === 200 || response.status === 201) {
      yield put(addUserSuccess(payload));
    }
  } catch (error) {
    yield put(addUserError(error));
  }
}

export function* getData() {
  try {
    const getDatas = yield call(getUsers);
    const response = getDatas.data;
    if (getDatas.status === 200 || getDatas.status === 201) {
      yield put(getUserSuccess(response));
    }
  } catch (error) {
    yield put(getUserError(error));
  }
}

export function* getidData(action) {
  try {
    const id = action.payload;
    const getidDatas = yield call(getUser, id);
    // const getresponse = getidDatas.data;
    if (getidDatas.status === 200 || getidDatas.status === 201) {
      yield put(getidUserSuccess(getidDatas.data));
    }
  } catch (error) {
    yield put(getidUserError(error));
  }
}

export function* updateData(action) {
  try {
    const updateData = action.payload;
    const id = updateData.id;
    const updateDatas = yield call(updateuser, id, updateData);
    if (updateDatas.status === 200 || updateDatas.status === 201) {
      yield put(updateUserSuccess(updateDatas));
    }
  } catch (error) {
    yield put(updateUserError(error));
  }
}
export function* deleteData(action) {
  try {
    const id = action.payload;
    const response = yield call(deleteUser, id);
    if (response.status === 200 || response.status === 201) {
      yield put(deleteUserSuccess(response));
    }
    yield put(getUserRequest(response));
  } catch (error) {
    yield put({ deleteUserError, error });
  }
}

function* watchFetchData() {
  yield takeLatest(types.CREATEUSER_REQUEST, postData);
  yield takeLatest(types.GETUSER_REQUEST, getData);
  yield takeLatest(types.GETIDUSER_REQUEST, getidData);
  yield takeLatest(types.UPDATEUSER_REQUEST, updateData);
  yield takeLatest(types.DELETEUSER_REQUEST, deleteData);
}

export default watchFetchData;