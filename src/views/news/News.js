import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {DEFAULT_CRITERIA} from 'types/news';

import {loadNews, selectNews} from 'redux/news';

import Loader from 'components/loader/Loader';

import ArticleThumb from '../../components/article/ArticleThumb';

import './News.scss';

const CLASS = 'na-News';

export default function News({criteria}) {
	const dispatch = useDispatch();
	const {news, loading} = useSelector(state => ({
		news: selectNews(state),
		loading: state.news.loading,
	}));

	useEffect(() => {
		dispatch(loadNews(criteria));
	}, [dispatch, criteria]);

	if (loading) {
		return <Loader />;
	}

	return (
		<div className={CLASS}>
			{news.length ? (
				news.map((item, key) => (
					<ArticleThumb
						key={key}
						id={item.id}
						title={item.title}
						content={item.description}
						url={item.urlToImage}
						alt={item.description}
					/>
				))
			) : (
				<h2>No articles found</h2>
			)}
		</div>
	);
}

News.defaultProps = {
	criteria: DEFAULT_CRITERIA,
};
