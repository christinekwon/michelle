'use client';
import React, { useState } from 'react';
import { hasArrayValue, toCamelCase } from '@/lib/helpers';
import Field from '@/components/Field';
import { useForm } from 'react-hook-form';

export default function CustomForm({ data }) {
	const { formTitle, customForm } = data || {};
	const { formFields } = customForm || {};

	const getRules = ({ required, inputType }) => {
		switch (inputType) {
			case 'email':
				return {
					required,
					pattern: {
						value: /^\S+@\S+$/i,
						message: 'Invalid email',
					},
				};
			case 'tel':
				return {
					required,
					minLength: { value: 6, message: 'Phone number is too short' },
					pattern: {
						value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
						message: 'Invalid phone number',
					},
				};
			default:
				return { required };
		}
	};

	const [submitState, setSubmitState] = useState('');
	const formFieldsData = (formFields || []).map((item) => {
		const { required, fieldLabel, inputType } = item || {};
		return {
			...item,
			name: toCamelCase(fieldLabel),
			rules: getRules({ required, inputType }),
		};
	});

	const defaultValues = formFieldsData.reduce((acc, { name, inputType }) => {
		acc[name] = '';
		return acc;
	}, {});

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({
		defaultValues,
	});

	const onHandleSubmit = async (formData) => {
		setSubmitState('');
		try {
			const response = await fetch('/api/submit-form', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			if (!response.ok) {
				throw new Error(`Error: ${response.statusText}`);
			}

			const data = await response.json();
			setSubmitState(data.state);
		} catch (error) {
			console.error('Form submission error:', error);
			setSubmitState('error');
		}
	};

	if (!hasArrayValue(formFields)) return null;

	return (
		<div className="c-form">
			<h4>{formTitle}</h4>
			<form onSubmit={handleSubmit(onHandleSubmit)}>
				{formFieldsData.map((item) => {
					const {
						placeholder,
						_key,
						rules,
						fieldLabel,
						name,
						inputType,
						selectOptions,
					} = item;

					return (
						<Field
							key={_key}
							placeholder={placeholder}
							type={inputType}
							errors={errors}
							label={fieldLabel}
							name={name}
							rules={rules}
							register={register}
							isFloatingLabel={false}
							selectOptions={selectOptions || []}
							hasValue={watch(name)}
						/>
					);
				})}
				<button type="submit" className="btn">
					Submit
				</button>
			</form>
			{submitState && (
				<p>
					{submitState == 'success'
						? data.successMessage || 'Success. Your message has been sent.'
						: data.errorMessage ||
							'Error. There was an issue submitting your message. Please try again later.'}
				</p>
			)}
		</div>
	);
}
