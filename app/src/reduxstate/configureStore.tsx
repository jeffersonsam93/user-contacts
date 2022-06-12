import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';

export default function configureStore(preloadedState: any) {
	let middleWare = applyMiddleware(thunkMiddleware);
	if (localStorage.getItem('devlog') === '1') {
		middleWare = applyMiddleware(thunkMiddleware);
	}
	return createStore(rootReducer, preloadedState, middleWare);
}
