export const addFavorite = (character) => ({
    type: 'ADD_FAVORITE',
    payload: character,
});

export const removeFavorite = (character) => ({
    type: 'REMOVE_FAVORITE',
    payload: character,
});