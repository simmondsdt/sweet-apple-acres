import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import orderReducer from './order.js';
import productReducer from './products.js';

const persistConfig = { key: 'state', storage };
const rootReducer = combineReducers({ order: orderReducer, products: productReducer });
const reducer = persistReducer(persistConfig, rootReducer);
const middleware = getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false });

const store = configureStore({ reducer, middleware });

export default store;
export const persistor = persistStore(store);
