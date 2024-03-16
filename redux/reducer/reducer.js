const initialState = {
    favorites: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_FAVORITE':
            if (state.favorites.length >= 10) {
                // Show error with Local Notification
                return state;
            }
            return {
                ...state,
                favorites: [...state.favorites, action.payload],
            };
        case 'REMOVE_FAVORITE':
            return {
                ...state,
                favorites: state.favorites.filter(
                    (favorite) => favorite.id !== action.payload.id
                ),
            };
        default:
            return state;
    }
};

export default rootReducer;