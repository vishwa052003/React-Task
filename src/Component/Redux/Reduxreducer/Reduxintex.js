import { combineReducers } from "@reduxjs/toolkit";
import reducer from "./Reducer";

const rootReducer = combineReducers({
  reducer: reducer,
});
export default rootReducer;
