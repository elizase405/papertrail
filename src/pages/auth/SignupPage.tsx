import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import SignupForm from '../../components/auth/SignupForm';
import Logo from '../../components/Logo';
import { useAuth } from '../../context/AuthContext';

const SignupPage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Add scroll reveal effect
    const elements = document.querySelectorAll('.fade-in-section');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('is-visible');
      }, index * 100);
    });
  }, []);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="fade-in-section w-full max-w-md">
        <div className="text-center mb-8">
          <Logo size="lg" showText={true} className="mx-auto" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <a href="/login" className="font-medium text-gray-900 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white">
              Sign in
            </a>
          </p>
        </div>
        
        <SignupForm />
      </div>
    </div>
  );
};

export default SignupPage;