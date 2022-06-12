import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import App from './App';
import { componentActions } from '../reduxstate/actions/views/components';

const mapStateToProps = (state: any) => {
	const { component } = state;
	//const { userPreferences } = component;

	return { };
};

const mapDispatchToProps = (dispatch: any) => ({
	componentActions: bindActionCreators(componentActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
