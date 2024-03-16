import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from '../reducer/favoritesSlice';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['favorites']
};

const persistedReducer = persistReducer(persistConfig, favoritesReducer);

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);