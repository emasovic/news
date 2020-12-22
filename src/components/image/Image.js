import React from 'react';
import PropTypes from 'prop-types';

import './Image.scss';

const CLASS = 'na-Image';

export default function Image({src, alt, ...rest}) {
	if (!src) {
		return (
			<div className={CLASS + '-fallback'}>
				{/* <Icon /> */}
			</div>
		);
	}

	return <img src={src} alt={alt} className={CLASS} {...rest} />;
}

Image.propTypes = {
	src: PropTypes.string,
	width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	alt: PropTypes.string,
};

Image.defaultProps = {
	src: '',
	alt: 'image',
};
