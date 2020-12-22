import React from 'react';
import {useSelector} from 'react-redux';

import {CATEGORIES} from 'types/news';

import CategoryPicker from 'components/category-presenter/CategoryPresenter';

export default function Categories() {
	const country = useSelector(state => state.application.country);
	const categories = Object.keys(CATEGORIES).map(item => item);

	return (
		<div>
			{categories.map((item, key) => (
				<CategoryPicker criteria={{country, category: item}} category={item} key={key} />
			))}
		</div>
	);
}
