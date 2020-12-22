import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import debounce from 'lodash.debounce';

import {COUNTRY_NAMES} from 'types/news';

import Input from 'components/input/Input';

import News from 'views/news/News';

import './Search.scss';

const CLASS = 'na-Search';

export default function Search() {
	const [search, setSearch] = useState('');

	const country = useSelector(state => state.application.country);

	const searchArticles = debounce(setSearch, 500);

	const criteria = {country, q: search};

	return (
		<div className={CLASS}>
			<h3>Search top news from {COUNTRY_NAMES[country]} by term</h3>
			<Input onChange={searchArticles} label="Search" placeholder="Search term..." />
			{search && <News criteria={criteria} />}
		</div>
	);
}
