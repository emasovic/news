import axios from 'axios';
import queryString from 'query-string';

export const request = opts => {
	if (!opts.url) {
		throw new Error('url is required');
	}

	opts.baseURL = process.env.REACT_APP_API_URL;
	opts.method = opts.method || 'get';

	opts.headers = {
		...opts.headers,
		'x-api-key': process.env.REACT_APP_API_KEY,
	};

	opts.paramsSerializer = params => {
		Object.keys(params).forEach(key => params[key] === null && delete params[key]);
		return queryString.stringify(params);
	};

	return axios(opts)
		.then(res => {
			return res.data;
		})
		.catch(res => {
			let err = null;
			let response = res.response;
			if (response && response.data && response.data.message) {
				err = response.data.message;
			} else if (response) {
				err = new Error(response.statusText);
				err.status = response.status;
			} else {
				err = new Error(res.message || 'HTTP Error');
				err.status = 0;
			}
			return {error: err};
		});
};

export const get = (url, params) => request({url, params});
