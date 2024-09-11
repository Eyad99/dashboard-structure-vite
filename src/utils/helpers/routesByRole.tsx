import SuperAdminRoutes from '@/routes/superAdmin';
import Cookies from 'js-cookie';

export const RoutesByRole = () => {
	let user: any = Cookies.get('user');
	user = user ? JSON.parse(user) : {};

	return user?.role?.name === 'SUPERADMIN' ? SuperAdminRoutes : SuperAdminRoutes;
};
