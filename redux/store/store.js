import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from '../reducer/favoritesSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['favorites'],
};

const persistedReducer = persistReducer(persistConfig, favoritesReducer);

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);