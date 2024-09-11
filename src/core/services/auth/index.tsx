import { SignIn_Req } from '@/core/models';
import { post } from '@/utils/api';

export const authApi = {
	signin: (data: SignIn_Req) => post(`login`, data),
};
