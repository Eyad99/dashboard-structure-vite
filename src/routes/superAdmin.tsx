import Dashboard from '@/views/admin/dashboard';

const SuperAdminRoutes = [
	{
		name: 'Dashboard',
		layout: '/admin',
		icon: <>d</>,
		path: '/dashboard',
		component: <Dashboard />,
	},
];
export default SuperAdminRoutes;
