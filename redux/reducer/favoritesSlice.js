import { createReducer } from '@reduxjs/toolkit';
import {REHYDRATE} from "redux-persist/es/constants";

const initialState = {
    favorites: [],
};

const favoritesReducer = createReducer(initialState, (builder) => {
    builder
        .addCase('ADD_FAVORITE', (state, action) => {
            // if (state.favorites.length >= 10) {
            //     // Show error with Local Notification
            //     return state;
            // }
            state.favorites.push(action.payload);
        })
        .addCase('REMOVE_FAVORITE', (state, action) => {
            state.favorites = state.favorites.filter(
                (favorite) => favorite.id !== action.payload.id
            );
        });
});

export default favoritesReducer;