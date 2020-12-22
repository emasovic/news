import {createSlice} from '@reduxjs/toolkit';

import {COUNTRY} from 'types/news';

export const applicationSlice = createSlice({
	name: 'application',
	initialState: {country: COUNTRY.gb},
	reducers: {
		setCountry: (state, action) => {
			state.country = action.payload;
		},
	},
});

export const {setCountry} = applicationSlice.actions;

export const initialize = () => dispatch => {
	const country = localStorage.getItem('country');

	if (country) {
		dispatch(setCountry(country));
	}
};

export const updateCountry = country => dispatch => {
	localStorage.setItem('country', country);
	dispatch(setCountry(country));
};

export default applicationSlice.reducer;
