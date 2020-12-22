import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

import {goToCategory} from 'lib/routes';

import {loadNewsForCategory, selectNewsByCategory} from 'redux/news';

import Loader from 'components/loader/Loader';
import Button from 'components/button/Button';
import ArticleThumb from 'components/article/ArticleThumb';

import './CategoryPresenter.scss';

const CLASS = 'na-CategoryPresenter';

const NAV = {
	prev: 'prev',
	next: 'next',
};

export default function CategoryPresenter({criteria, category}) {
	const dispatch = useDispatch();
	const [sliceStart, setSliceStart] = useState(0);
	const [sliceEnd, setSliceEnd] = useState(5);
	const [IsOpen, setIsOpen] = useState(false);

	const {news, loading} = useSelector(state => ({
		news: selectNewsByCategory(state, category),
		loading: state.news.loading,
	}));

	const changeSlide = nav => {
		if (nav === NAV.prev) {
			if (sliceStart === 0) {
				setSliceStart(0);
				return setSliceEnd(5);
			}

			setSliceStart(sliceStart - 1);
			setSliceEnd(sliceEnd - 1);
		} else {
			if (sliceEnd === news.length) {
				setSliceStart(0);
				return setSliceEnd(3);
			}

			setSliceStart(sliceStart + 1);
			setSliceEnd(sliceEnd + 1);
		}
	};

	useEffect(() => {
		dispatch(loadNewsForCategory(criteria));
	}, [criteria, dispatch]);

	if (loading) {
		return <Loader />;
	}
	const label = IsOpen ? '<' : '>';
	return (
		<div className={CLASS}>
			<div className={CLASS + '-title'}>
				<Link to={goToCategory(category)}>{category}</Link>
				<Button onClick={() => setIsOpen(!IsOpen)}>{label}</Button>
			</div>

			<div className={CLASS + '-wrapper'}>
				{IsOpen && <Button onClick={() => changeSlide(NAV.prev)}>{'<'}</Button>}
				<div className={CLASS + '-wrapper-news'}>
					{news.length ? (
						news
							.slice(sliceStart, sliceEnd)
							.map((item, key) => (
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

				{IsOpen && <Button onClick={() => changeSlide(NAV.next)}>{'>'}</Button>}
			</div>
		</div>
	);
}
