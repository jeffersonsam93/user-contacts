
// core components/views for Admin layout
import User from '../layouts/user';
import UserInfo from '../layouts/userinfo';
import Routes from '../interfaces/routes.interface';

const routes:Routes[] = [
	{
		path: '/user',
		component: <User/>,
	},
	{
		path: '/userinfo',
		component: <UserInfo/>,
	},
];

export default routes;
