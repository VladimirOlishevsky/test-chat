import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import chatReducer from "../reducers/reducer";
//import serviceListReducer from "../reducers/serviceList";


const reducer = combineReducers({
    reducerChat: chatReducer,
    // serviceList: serviceListReducer,
    // serviceCategoriesList: serviceCategoriesListReducer,
    // serviceCategoriesMore: serviceCategoriesMoreReducer,
    // catalogSearch: catalogSearchReducer,
    // searchWord: searchWordReducer,
    // itemCard: itemCardReducer,
    // cartChange: cartReducer,
    // postOrder: postOrderReducer,

});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(
    applyMiddleware(thunk)
));

export default store;