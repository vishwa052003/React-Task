import { all } from "redux-saga/effects";
import watchFetchData from "../../Redux/Services/SagaApi";

export default function* rootSaga() {
  yield all([watchFetchData()]);
}