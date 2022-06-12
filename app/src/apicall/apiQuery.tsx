import apicall from './apicall';

export default function apiQuery(type: any, params: any, method: any, body: any) {
	const querString = [];
	for (const key in params) {
		if (params.hasOwnProperty(key)) {
			const element = params[key];
			querString.push(`${key}=${element}`);
		}
	}

	return apicall(`${type}${querString.length > 0 ? '?' : ''}${querString.join('&')}`, method, body);
}
