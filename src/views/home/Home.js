import React from 'react';
import {useSelector} from 'react-redux';
import {COUNTRY_NAMES} from 'types/news';

import News from 'views/news/News';

import './Home.scss';

const CLASS = 'na-Home';

export default function Home() {
	const country = useSelector(state => state.application.country);
	const criteria = {country};
	return (
		<div className={CLASS}>
			<h3>Top news from {COUNTRY_NAMES[country]}</h3>
			<News criteria={criteria} />
		</div>
	);
}
