
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Snackbar from './Snackbar';
import { componentActions } from '../../reduxstate/actions/views/components';

const mapStateToProps = (state: any) => {
	const { component } = state;
	const {  snackbar  } = component;

	return {  snackbar };
};

const mapDispatchToProps = (dispatch: any) => ({
	componentActions: bindActionCreators(componentActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Snackbar);
