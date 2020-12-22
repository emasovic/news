import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import debounce from 'lodash.debounce';

import Input from 'components/input/Input';

import News from 'views/news/News';

export default function Search() {
	const [search, setSearch] = useState('');

	const country = useSelector(state => state.application.country);

	const searchArticles = debounce(setSearch, 500);

	const criteria = {country, q: search};

	return (
		<div>
			<Input onChange={searchArticles} label="Search" placeholder="Search term..." />
			{search && <News criteria={criteria} />}
		</div>
	);
}
