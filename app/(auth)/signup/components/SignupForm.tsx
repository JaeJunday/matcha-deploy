'use client';

import IdInput from './IdInput';
import PasswordInput from './PasswordInput';
import UserNameInput from './UserNameInput';

interface SignupFormProps {
  handler: (event: React.FormEvent<HTMLFormElement>) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ handler }) => {
  return (
    <form
      onSubmit={handler}
      className="max-w-md min-w-96 min-h-96 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <h5 className="text-lg font-semibold mb-5 underline decoration-wavy decoration-pink-500/50">
        회원가입을 위한 계정정보를 입력해주세요.
      </h5>

      <UserNameInput />
      <IdInput />
      <PasswordInput />

      <div className="flex justify-end mt-10">
        <button
          type="submit"
          className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Next Step
        </button>
      </div>
    </form>
  );
};

export default SignupForm;