import React from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

import {CATEGORIES, COUNTRY_NAMES} from 'types/news';

import News from 'views/news/News';

import Loader from 'components/loader/Loader';

import './Category.scss';

const CLASS = 'na-Category';

export default function Category() {
	const {category} = useParams();
	const country = useSelector(state => state.application.country);

	const criteria = {category, country};

	if (!CATEGORIES[category]) {
		return <Loader />;
	}
	return (
		<div className={CLASS}>
			<h3>
				Top {category} news from {COUNTRY_NAMES[country]}
			</h3>
			<News criteria={criteria} />
		</div>
	);
}
