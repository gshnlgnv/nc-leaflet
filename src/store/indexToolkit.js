import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import dataSlicer from './dataSlicer';

const middleware = [
    ...getDefaultMiddleware(),
];

export default configureStore({
    reducer: {
        dataReducer: dataSlicer,
    },
    middleware,
})
