import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';

const removeNonSerializable = (action) => {
    const { register, rehydrate, ...rest } = action;
    return rest;
};

const removeNonSerializableMiddleware = ({ getState }) => (next) => (action) => {
    if (typeof action === 'function') {
        return next(action);
    }

    if (action.hasOwnProperty('meta') && action.meta.arg && typeof action.meta.arg.removeNonSerializable === 'function') {
        const cleanedAction = action.meta.arg.removeNonSerializable(action);
        return next(cleanedAction);
    }

    return next(action);
};

export default removeNonSerializableMiddleware;