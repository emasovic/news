import React from 'react';
import {useSelector} from 'react-redux';

import {CATEGORIES, COUNTRY_NAMES} from 'types/news';

import CategoryPicker from 'components/category-presenter/CategoryPresenter';

import './Categories.scss';

const CLASS = 'na-Categories';

export default function Categories() {
	const country = useSelector(state => state.application.country);
	const categories = Object.keys(CATEGORIES).map(item => item);

	return (
		<div className={CLASS}>
			<h3>Top 5 news by categories from {COUNTRY_NAMES[country]}</h3>
			{categories.map((item, key) => (
				<CategoryPicker criteria={{country, category: item}} category={item} key={key} />
			))}
		</div>
	);
}
