// store.js
import { configureStore } from "@reduxjs/toolkit";
import vendorReducer from "./vendorSlice";
import adminReducer from "./adminSlice";

const store = configureStore({
  reducer: {
    vendor: vendorReducer,
    admin: adminReducer,
  },
});

export default store;