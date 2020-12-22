import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import history from 'lib/history';

import news from './news';
import application from './application';

const customizedMiddleware = getDefaultMiddleware({
	thunk: {
		extraArgument: history,
	},
	serializableCheck: false,
});

const store = configureStore({
	reducer: {
		news,
		application,
	},
	middleware: customizedMiddleware,
});

export default store;
