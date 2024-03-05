'use client';
import { useState } from 'react';
import EmailLoginForm from './components/EmailLoginForm';
import GoogleLoginButton from './components/GoogleLoginButton';
import KakaoLoginButton from './components/KakaoLoginButton';
import EmailLoginButton from './components/EmailLoginButton';
import CreateAccountButton from './components/CreateAccountButton';
import ToggleEmailFormButton from './components/ToggleEmailFormButton';

const LoginPage: React.FC = () => {
  const [emailFormView, setEmailFormView] = useState(false);

  const toggle = () => {
    setEmailFormView(!emailFormView);
  };

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="max-w-100 min-w-96 min-h-96 flex flex-col text-center items-center justify-center bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-row ml-5 mr-5 mt-5">
          <ToggleEmailFormButton handle={toggle} />
          <h5 className="text-3xl ml-5 min-w-80 font-semibold text-gray-900 dark:text-white flex-grow">
            Welcome to tea for two!
          </h5>
        </div>
        {!emailFormView ? (
          <div className="flex flex-col items-center justify-center min-h-80 gap-2">
            <GoogleLoginButton />
            <KakaoLoginButton />
            <h6 className="text-md mb-2 text-gray-600"> or </h6>
            <EmailLoginButton handle={toggle} />
          </div>
        ) : (
          <div className="mt-10 mb-10">
            <EmailLoginForm />
          </div>
        )}
        <div className="mb-5">
          <CreateAccountButton />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
