import React from 'react';

export default function Input({onChange, ...rest}) {
	return <input onChange={e => onChange(e.target.value)} {...rest} />;
}
