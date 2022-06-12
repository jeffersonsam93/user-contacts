import { combineReducers } from 'redux';
import * as views from './views';

export default combineReducers({
	...views,
});
