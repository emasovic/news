import React from 'react';
import {Link, matchPath, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {CATEGORIES, HOME, SEARCH, SINGLE_ARTICLE} from 'lib/routes';

import {COUNTRY} from 'types/news';

import {setCountry} from 'redux/application';

import Button from 'components/button/Button';

import './Nav.scss';

const CLASS = 'na-Nav';

export default function Nav() {
	const dispatch = useDispatch();
	const location = useLocation();

	const path = matchPath(location.pathname, {
		path: SINGLE_ARTICLE,
	});

	const disabled = path?.isExact;

	const country = useSelector(state => state.application.country);

	const updateLanguage = country => {
		dispatch(setCountry(country));
	};

	return (
		<nav className={CLASS}>
			<div className={CLASS + '-items'}>
				<Link to={HOME}>Top news</Link>
				<Link to={CATEGORIES}>Categories</Link>
				<Link to={SEARCH}>Search</Link>
			</div>
			<div className={CLASS + '-countries'}>
				<Button
					onClick={() => updateLanguage(COUNTRY.gb)}
					active={country === COUNTRY.gb || !country}
					disabled={disabled}
				>
					GB
				</Button>
				<Button
					onClick={() => updateLanguage(COUNTRY.us)}
					active={country === COUNTRY.us}
					disabled={disabled}
				>
					US
				</Button>
			</div>
		</nav>
	);
}
