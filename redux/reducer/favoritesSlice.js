import { createReducer } from '@reduxjs/toolkit';

const initialState = {
    favorites: [],
};

const favoritesReducer = createReducer(initialState, (builder) => {
    builder
        .addCase('ADD_FAVORITE', (state, action) => {
            // Validate payload structure
            if (!action.payload || typeof action.payload.id === 'undefined') {
                return;
            }
            // Enforce max limit to prevent unbounded state growth / persistent storage abuse
            if (state.favorites.length >= 10) {
                return;
            }
            // Prevent duplicate entries
            const exists = state.favorites.some((fav) => fav.id === action.payload.id);
            if (!exists) {
                state.favorites.push(action.payload);
            }
        })
        .addCase('REMOVE_FAVORITE', (state, action) => {
            if (!action.payload || typeof action.payload.id === 'undefined') {
                return;
            }
            state.favorites = state.favorites.filter(
                (favorite) => favorite.id !== action.payload.id
            );
        });
});

export default favoritesReducer;