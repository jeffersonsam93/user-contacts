export const types = {
	UPDATE_COMP: 'UPDATE_COMP',
};

export const componentActions = {
	updateComponent(data: any) {
		return (dispatch: any) => {
			dispatch({
				type: types.UPDATE_COMP,
				payload: data,
			});
		};
	},
};
