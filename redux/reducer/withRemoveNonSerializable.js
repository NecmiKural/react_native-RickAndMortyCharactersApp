import { createReducer } from '@reduxjs/toolkit';

const removeNonSerializable = (action) => {
    const { register, rehydrate, ...rest } = action;
    return rest;
};

const withRemoveNonSerializable = (reducer, initialState, handlers) => {
    return createReducer(initialState, (builder) => {
        Object.entries(handlers).forEach(([type, handler]) => {
            builder.addCase(type, handler);
        });

        builder.addCase('persist/PERSIST', (state, action) => {
            if (action.hasOwnProperty('meta') && action.meta.arg && typeof action.meta.arg.removeNonSerializable === 'function') {
                const cleanedAction = action.meta.arg.removeNonSerializable(action);
                reducer(state, cleanedAction);
            } else {
                reducer(state, action);
            }
        });
    });
};

export default withRemoveNonSerializable;