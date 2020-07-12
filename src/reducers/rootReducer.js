import {combineReducers} from 'redux';
// import {persistReducer} from "redux-persist";
// import storage from "redux-persist/lib/storage";

import Products from './productReducer';
// import Filters from './filterProductReducer';
import Users from './userReducer';
// const persistConfig = {
//     key: "root",
//     storage,
//     whitelist: ["products"]
// }

export default combineReducers({
    products: Products,
    // filters: Filters,
    users: Users
});

// export default persistReducer(persistConfig, rootReducer);