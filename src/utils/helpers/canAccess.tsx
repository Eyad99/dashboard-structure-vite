import { KEY_TOKEN_COOKIE, KEY_USER_COOKIE } from '@/variables/constants';
import Cookies from 'js-cookie';

const token = Cookies.get(KEY_TOKEN_COOKIE);
let user: any = Cookies.get(KEY_USER_COOKIE);
user = user ? JSON.parse(user) : {};

const CanAccess = (navigate: any) => {
	if (token) {
		switch (user?.role?.name) {
			case 'SUPERADMIN':
				navigate('/admin/orders');
				break;

			default:
				break;
		}
		return true;
	} else {
		return false;
	}
};
export default CanAccess;

export const NavigateByRole = user?.role?.name === 'SUPERADMIN' ? '/admin/orders' : '/auth/sign-in';
