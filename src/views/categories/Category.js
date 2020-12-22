import React from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

import News from 'views/news/News';

export default function Category() {
	const {category} = useParams();
	const country = useSelector(state => state.application.country);

	const criteria = {category, country};
	return <News criteria={criteria} />;
}
