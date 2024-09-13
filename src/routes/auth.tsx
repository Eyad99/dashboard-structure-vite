import SignIn from '@/views/auth/signIn';
import SignUp from '@/views/auth/signUp';
import NotFound from '@/views/not-found';

const AuthRoutes = [
	{
		name: 'sign-in',
		layout: '/auth',
		path: '/sign-in',
		component: <SignIn />,
	},
	{
		name: 'sign-up',
		layout: '/auth',
		path: '/sign-up',
		component: <SignUp />,
	},

	{
		name: 'NotFound',
		layout: '/auth',
		path: '*',
		invisible: true,
		component: <NotFound />,
	},
];
export default AuthRoutes;
