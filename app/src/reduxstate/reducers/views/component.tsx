import { types } from '../../actions/views/components';

export default function componentReducer(
	state = {
		name:'', 
		mobilenumber:'' ,
		base64:'',
		snackbar:{
			open:false,
			message:[],
			severity:'',
			duration:60000
		},
		userInfo:[],
		initialized:false,
		selValue:{},
		dispValue:{}
	},
	action: { payload: any; type: any }
) {
	const payload = action.payload;
	switch (action.type) {
		case types.UPDATE_COMP:
			return {
				...state,
				...payload,
			};
		default:
			return state;
	}
}
