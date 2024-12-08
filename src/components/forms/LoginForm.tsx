import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const LoginForm: React.FC = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [initialEmail, setInitialEmail] = useState('');

  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setInitialEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Minimum 6 characters required').required('Required'),
  });

  return (
    <div className="bg-gray-800 text-white p-10 rounded-lg shadow-lg max-w-lg mx-auto mt-12">
      <h2 className="text-4xl font-extrabold mb-8 text-center">Login</h2>
      <Formik
        initialValues={{
          email: initialEmail,
          password: '',
        }}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          if (rememberMe) {
            localStorage.setItem('rememberedEmail', values.email);
          } else {
            localStorage.removeItem('rememberedEmail');
          }
          alert('Login Successful!');
        }}
      >
        {() => (
          <Form>
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
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="flex items-center justify-between mb-8">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="mr-2 accent-blue-600"
                />
                <span className="text-gray-300 text-sm">Remember Me</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold rounded-md transition-all"
            >
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
