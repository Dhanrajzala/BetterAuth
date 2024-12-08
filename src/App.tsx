import React, { useState } from 'react';
import LoginForm from './components/forms/LoginForm.tsx';
import SignUpForm from './components/forms/SignUpForm.tsx';
import './App.css';
import './index.css';


function App() {
  const [showForm, setShowForm] = useState<'login' | 'signup'>('login');

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">Auth Portal</h1>
        <p className="text-gray-400 mt-2">Switch between Login and Sign Up</p>
      </header>
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6 space-x-4">
          <button
            className={`px-4 py-2 rounded-md ${
              showForm === 'login' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
            }`}
            onClick={() => setShowForm('login')}
          >
            Login
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              showForm === 'signup' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
            }`}
            onClick={() => setShowForm('signup')}
          >
            Sign Up
          </button>
        </div>
        {showForm === 'login' ? <LoginForm /> : <SignUpForm />}
      </div>
    </div>
  );
}

export default App;
