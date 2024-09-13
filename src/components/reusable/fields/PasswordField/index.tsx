import React, { FC, useCallback, useState } from 'react';
import TextField from '../TextField';
import EyeToggleButton from './EyeToggleButton';

type PasswordFieldProps = {
	onBlur: {
		(e: React.FocusEvent<any>): void;
		<T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
	};
	onChange: {
		(e: React.ChangeEvent<any>): void;
		<T_1 = string | React.ChangeEvent<any>>(field: T_1): T_1 extends React.ChangeEvent<any>
			? void
			: (e: string | React.ChangeEvent<any>) => void;
	};
	value?: string;
	touched?: boolean;
	errors?: string;
	name?: string;
	label?: string | any;
};

const PasswordField: FC<PasswordFieldProps> = ({ onBlur, onChange, value, touched, errors, name = 'password', label = 'password' }) => {
	const [passwordVisibility, setPasswordVisibility] = useState(false);

	const togglePasswordVisibility = useCallback(() => {
		setPasswordVisibility((visible) => !visible);
	}, []);

	return (
		<div className='relative'>
			<TextField
				label={label}
				name={name}
				autoComplete='on'
				onBlur={onBlur}
				onChange={onChange}
				value={value}
				type={passwordVisibility ? 'text' : 'password'}
				error={!!touched && !!errors}
				helperText={touched && errors}
			/>  

			<div className='absolute top-[40%] left-[88%]'>
				<EyeToggleButton show={passwordVisibility} click={togglePasswordVisibility} />
			</div>
		</div>
	);
};

export default PasswordField;
