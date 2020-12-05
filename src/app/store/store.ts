import {allReducer} from './allReducers';
import createSagaMiddleware from 'redux-saga';
import logger, {createLogger} from 'redux-logger';
import {rootSaga} from './rootSagas';
import {applyMiddleware, compose, configureStore, createStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {persistStore, persistCombineReducers, persistReducer} from 'redux-persist';
import AsyncStorage from "@react-native-community/async-storage";

type StoreState = any
const devMode = __DEV__;
const sagaMiddleware = createSagaMiddleware();
const middleware = [];
middleware.push(sagaMiddleware);

const config = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: [""],
    debug: true, //to get useful logging
};

if (devMode) {
    middleware.push(logger);
}
const enhancers = [applyMiddleware(...middleware)];
// const reducers = persistCombineReducers(config, allReducer);
const persistConfig: any = {enhancers};

const persistedReducer = persistReducer(config, allReducer);
let store = createStore(persistedReducer, undefined, applyMiddleware(...middleware));
let persistor = persistStore(store,persistConfig);

const storeConfig = () => {
    return {persistor, store};
};

sagaMiddleware.run(rootSaga);

export default storeConfig;
