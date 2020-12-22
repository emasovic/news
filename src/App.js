import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';

import {CATEGORIES, CATEGORY, HOME, SEARCH, SINGLE_ARTICLE} from 'lib/routes';
import history from 'lib/history';

import Article from 'views/news/Article';
import Categories from 'views/categories/Categories';
import Search from 'views/search/Search';
import Home from 'views/home/Home';
import Category from 'views/categories/Category';

import Nav from 'components/nav/Nav';

import './App.scss';

const CLASS = 'na-App';

function App() {
	return (
		<Router history={history}>
			<Nav />
			<div className={CLASS}>
				<Switch>
					<Route exact path={HOME} component={Home} />
					<Route path={SINGLE_ARTICLE} component={Article} />
					<Route path={CATEGORY} component={Category} />
					<Route path={CATEGORIES} component={Categories} />
					<Route path={SEARCH} component={Search} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
