// store.js
import { configureStore } from "@reduxjs/toolkit";
import vendorReducer from "./vendorSlice";
import adminReducer from "./adminSlice";
import navigationReducer from './navigationSlice';
import headerReducer from './headerSlice';
import imageReducer from './imageSlice';
import footerReducer from './footerSlice';


const store = configureStore({
  reducer: {
    vendor: vendorReducer,
    admin: adminReducer,
    navigation: navigationReducer,
    header: headerReducer,
    image: imageReducer, 
    footer: footerReducer
  },
});

export default store;