import { KEY_TOKEN_COOKIE, KEY_USER_COOKIE } from '@/variables/constants';
import { SignIn_Req, authApi } from '@/core';
import { useMutateData } from '@/hooks/useMutateData';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import Cookies from 'js-cookie';
import * as yup from 'yup';
import Default from '@/layouts/auth/types/Default';

function SignIn() {
	const navigate = useNavigate();

	// useEffect(() => {
	// 	const tokenExists = CanAccess(navigate);
	// 	if (tokenExists) {
	// 		return;
	// 	}
	// }, []);

	const signInMutate = useMutateData({
		mutationFn: (data: SignIn_Req) => authApi.signin(data),
		onSuccessFn: ({ data }) => {
			Cookies.set(KEY_TOKEN_COOKIE, data.data.access_token);
			Cookies.set(KEY_USER_COOKIE, JSON.stringify(data.data.user));

			switch (data?.data?.user?.role?.name) {
				case 'SUPERADMIN':
					navigate('/admin/orders');
					break;
				case 'BRANCHADMIN':
					navigate('/branch-admin/orders');
					break;
				case 'RESTAURANTADMIN':
					navigate('/restaurant-admin/orders');
					break;
				case 'DISPATCHER':
					navigate('/dispatcher/orders');
					break;
				case 'CALLCENTER_CASHIER':
					navigate('/callcenter-cashier/orders');
					break;

				default:
					break;
			}
		},
	});

	const initialValues = {
		username: '',
		password: '',
	};

	const handleFormSubmit = (values: any) => {
		signInMutate.mutate(values);
	};

	const formSchema = yup.object().shape({
		username: yup.string().required(`email address is required`),
		password: yup
			.string()
			.matches(/^(?=.{8,})/, `must contain 8 character`)
			.required(`password is required`),
	});

	const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
		initialValues,
		onSubmit: handleFormSubmit,
		validationSchema: formSchema,
	});

	return (
		<Default
			maincard={
				<form onSubmit={handleSubmit}>
					<div className='mb-16 mt-12 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start'>
						<div className='mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]'>
							<h3 className='mb-2.5 text-4xl font-bold text-navy-700 dark:text-white'>Sign In</h3>
							<p className='mb-9 ml-1 text-base text-gray-600'>Enter your email and password to sign in!</p>

							{/* <TextField
								label={`email`}
								mb={2}
								name='username'
								size='small'
								type='email'
								variant='outline'
								onBlur={handleBlur}
								value={values.username}
								onChange={handleChange}
								error={!!touched.username && !!errors.username}
								helperText={touched.username && errors.username}
							/>

							<PasswordField
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.password}
								touched={touched.password}
								errors={errors.password}
								label={`password`}
							/> */}

							{/* <div className='mb-4 flex items-center justify-between px-2'>
								<a className='text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white' href=' '>
									Forgot Password?
								</a>
							</div> */}
						</div>
					</div>
				</form>
			}
		/>
	);
}

export default SignIn;
