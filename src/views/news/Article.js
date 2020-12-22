import React from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

import {selectArticle} from 'redux/news';

import Loader from 'components/loader/Loader';

import ArticleThumb from '../../components/article/ArticleThumb';

import './Article.scss';

const CLASS = 'na-Article';

export default function Article() {
	const {id} = useParams();

	const article = useSelector(state => selectArticle(state, id));

	if (!article) {
		return <Loader />;
	}

	const {title, urlToImage, content} = article;

	return (
		<div className={CLASS}>
			<ArticleThumb
				title={title}
				url={urlToImage}
				content={content}
				alt={article.description}
			/>
		</div>
	);
}
