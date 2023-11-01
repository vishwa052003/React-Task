import rootReducer from "./Reduxintex";
import { configureStore } from "@reduxjs/toolkit";

export const Store = configureStore({ reducer: rootReducer });