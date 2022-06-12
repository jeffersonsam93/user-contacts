import axios from 'axios';
let refreshCount = 0;

export const getHost = (url: any) => {
	const loc = window.location;
	const prot = loc.protocol;
	let mode = 'production';
	if (mode === 'production') {
		return prot + '//' + loc.host + '/api';
	} else {
		return  'http:////localhost:3005/api';
	}
	//return prot + '//' + (process.env.NODE_ENV === 'production' ? loc.host : 'localhost:3002');
};

const Apicall = (url: any, method: any, body: any) => {
	refreshCount = 0;
	const options = {
		method: method || 'GET',
		url: `${getHost(url)}/${url}`,
		//withCredentials: true,
		data: body,
	};
	//console.log(options);
	//axios.defaults.withCredentials = true;
	const res = axios(options);
	return res;
};
export default Apicall;

