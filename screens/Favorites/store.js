import {createStore} from 'redux';

const initialState ={
    favorites: [],
};

function favoritesReducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_FAVORITE':
            return {
                ...state,
                favorites: [...state.favorites, action.payload],
            };
        case 'REMOVE_FAVORITE':
            return {
                ...state,
                favorites: state.favorites.filter((favorite) => favorite.id !== action.payload.id),
            };
        default:
            return state;
    }
}

const store = createStore(favoritesReducer);

export default store;