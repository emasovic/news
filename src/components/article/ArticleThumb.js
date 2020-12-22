import React from 'react';
import {useHistory} from 'react-router-dom';

import {goToSingleArticle} from 'lib/routes';

import Image from 'components/image/Image';

import './ArticleThumb.scss';

const CLASS = 'na-ArticleThumb';

const LABELS = {
	more: 'More',
	back: 'Back to List',
};

export default function ArticleThumb({id, title, content, url, alt}) {
	const label = id ? LABELS.more : LABELS.back;
	const history = useHistory();

	const goTo = () => {
		if (id) {
			return history.push(goToSingleArticle(id));
		}
		return history.goBack();
	};
	return (
		<div className={CLASS}>
			<h3>{title}</h3>
			<Image src={url} alt={alt} />
			<span>{content}</span>
			<div onClick={() => goTo()}>{label}</div>
		</div>
	);
}
