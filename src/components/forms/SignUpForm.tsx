import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const SignUpSchema = Yup.object().shape({
  name: Yup.string().min(3, 'Too Short!').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(6, 'Minimum 6 characters')
    .matches(/[A-Z]/, 'Must contain an uppercase letter')
    .matches(/[0-9]/, 'Must contain a number')
    .required('Required'),
});

const SignUpForm: React.FC = () => {
  const [passwordStrength, setPasswordStrength] = useState('Weak');

  const evaluatePasswordStrength = (password: string) => {
    if (password.length < 6) return 'Weak';
    if (/[A-Z]/.test(password) && /[0-9]/.test(password)) return 'Strong';
    return 'Medium';
  };

  return (
    <div className="bg-gray-800 text-white p-10 rounded-lg shadow-lg max-w-lg mx-auto mt-12">
      <h2 className="text-4xl font-extrabold mb-8 text-center">Sign Up</h2>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
        }}
        validationSchema={SignUpSchema}
        onSubmit={(values, { setSubmitting }) => {
          alert('Sign Up Successful');
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <div className="mb-8">
              <label htmlFor="name" className="block text-lg font-medium text-gray-300 mb-2">Name</label>
              <Field
                type="text"
                name="name"
                id="name"
                className="w-full px-4 py-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring focus:ring-blue-500 outline-none"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="mb-8">
              <label htmlFor="email" className="block text-lg font-medium text-gray-300 mb-2">Email</label>
              <Field
                type="email"
                name="email"
                id="email"
                className="w-full px-4 py-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring focus:ring-blue-500 outline-none"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="mb-8">
              <label htmlFor="password" className="block text-lg font-medium text-gray-300 mb-2">Password</label>
              <Field
                type="password"
                name="password"
                id="password"
                className="w-full px-4 py-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring focus:ring-blue-500 outline-none"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const password = e.target.value;
                  setFieldValue('password', password);
                  setPasswordStrength(evaluatePasswordStrength(password));
                }}
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              <div
                className={`mt-3 text-sm font-semibold ${
                  passwordStrength === 'Weak'
                    ? 'text-red-500'
                    : passwordStrength === 'Medium'
                    ? 'text-yellow-500'
                    : 'text-green-500'
                }`}
              >
                Password Strength: {passwordStrength}
              </div>
            </div>

            <button
              type="submit"
              className="flex-1 py-5 text-center font-medium border-b border-blue-500 text-blue-500"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing up...' : 'Sign Up'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUpForm;
