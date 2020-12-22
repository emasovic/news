import React from 'react';
import {useSelector} from 'react-redux';

import News from 'views/news/News';

export default function Home() {
	const country = useSelector(state => state.application.country);
	const criteria = {country};
	return <News criteria={criteria} />;
}
