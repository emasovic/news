import {createSlice, createEntityAdapter} from '@reduxjs/toolkit';
import queryString from 'query-string';
import uniqueid from 'lodash.uniqueid';

import {getTopHeadlines} from 'lib/api';
import {setCountry} from './application';

const newsAdapter = createEntityAdapter({
	selectId: entity => entity.id,
	sortComparer: (a, b) => a.publishedAt.localeCompare(b.publishedAt),
});

export const newsSlice = createSlice({
	name: 'news',
	initialState: newsAdapter.getInitialState({loading: null}),
	reducers: {
		newsReceieved: (state, action) => {
			newsAdapter.setAll(state, action.payload);
			state.loading = null;
		},
		newsUpsert: (state, action) => {
			newsAdapter.upsertMany(state, action.payload);
			state.loading = null;
		},
		loadingStart: state => {
			state.loading = true;
		},
		loadingEnd: state => {
			state.loading = false;
		},
	},
});

export const {loadingStart, newsUpsert, loadingEnd, newsReceieved} = newsSlice.actions;

export const loadNews = params => async dispatch => {
	dispatch(loadingStart());
	const res = await getTopHeadlines(params);
	if (res.error) {
		dispatch(loadingEnd());
		return alert(res.error);
	}

	const articles = res?.articles?.map(item => ({...item, id: uniqueid('article_')}));

	return dispatch(newsReceieved(articles));
};

export const loadNewsForCategory = params => async (dispatch, getState) => {
	dispatch(loadingStart());
	const res = await getTopHeadlines(params);
	if (res.error) {
		dispatch(loadingEnd());
		return alert(res.error);
	}

	const {category} = params;

	const articles = res?.articles?.map(item => ({
		...item,
		id: uniqueid('article_' + category),
		category,
	}));

	return dispatch(newsUpsert(articles));
};

export const navigateToQuery = (queryOb, location) => (dispatch, getState, history) => {
	const query = queryString.parse(location.search);
	const {country} = queryOb;

	const q = queryString.stringify({...query, ...queryOb});

	country && dispatch(setCountry(country));

	history.push({pathname: location.path, search: q});
};

//SELECTORS

const newsSelector = newsAdapter.getSelectors(state => state.news);

export const selectNews = state => newsSelector.selectAll(state);
export const selectNewsByCategory = (state, category) => {
	const entities = newsSelector.selectAll(state);

	return entities.filter(item => item.category === category);
};

export const selectArticle = (state, id) => newsSelector.selectById(state, id);

export default newsSlice.reducer;
