import React from 'react';
import classNames from 'classnames';

import './Button.scss';

const CLASS = 'na-Button';

export default function Button({children, active, ...props}) {
	const className = classNames(CLASS, active && 'active');

	return (
		<button className={className} {...props}>
			{children}
		</button>
	);
}
