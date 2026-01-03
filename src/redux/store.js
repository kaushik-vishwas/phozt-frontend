import { configureStore } from "@reduxjs/toolkit";
import vendorReducer from "./vendorSlice";
import adminReducer from "./adminSlice";
import navigationReducer from './navigationSlice';
import headerReducer from './headerSlice';
import imageReducer from './imageSlice';
import footerReducer from './footerSlice';
import citiesReducer from './citiesSlice';
import homePagesReducer from './homePageSlice';
import servicePagesReducer from './servicePageSlice'; // Add this import

const store = configureStore({
  reducer: {
    vendor: vendorReducer,
    admin: adminReducer,
    navigation: navigationReducer,
    header: headerReducer,
    image: imageReducer, 
    footer: footerReducer, 
    cities: citiesReducer,
    homepages: homePagesReducer,
    servicepages: servicePagesReducer, // Add this line
  },
});

export default store;