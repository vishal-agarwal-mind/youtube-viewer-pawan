import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { videoReducer, commentReducer } from "./reducer";

export default configureStore({
    reducer: {
        video: videoReducer,
        comment: commentReducer
    },
    middleware: [logger]
})
