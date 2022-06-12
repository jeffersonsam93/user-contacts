import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import User from './User';
import { componentActions } from '../../reduxstate/actions/views/components';

const mapStateToProps = (state: any) => {
	const { component } = state;
	const {  name, mobilenumber, base64  } = component;

	return {  name, mobilenumber, base64 };
};

const mapDispatchToProps = (dispatch: any) => ({
	componentActions: bindActionCreators(componentActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
