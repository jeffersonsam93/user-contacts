import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UserInfo from './UserInfo';
import { componentActions } from '../../reduxstate/actions/views/components';

const mapStateToProps = (state: any) => {
	const { component } = state;
	const {  userInfo, base64,initialized,selValue,dispValue  } = component;

	return {  userInfo, base64,initialized,selValue,dispValue };
};

const mapDispatchToProps = (dispatch: any) => ({
	componentActions: bindActionCreators(componentActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
