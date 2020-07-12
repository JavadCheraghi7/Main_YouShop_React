import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from "redux-devtools-extension";
// import {persistStore} from "redux-persist";
import thunk from 'redux-thunk';
import rootReducer from "./reducers/rootReducer";


const initialState = {};

const middleware = [thunk];

const Store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

// export const persistor = persistStore(Store);

export default Store;