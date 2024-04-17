import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface LoginFormProps {
  setId: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setPassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  lostPassword: JSX.Element;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ setId, setPassword, lostPassword, onSubmit }) => {
  const id = useSelector((state: RootState) => state.accountSlice.user.identity.loginId);
  const password = useSelector((state: RootState) => state.accountSlice.user.account.password);
  return (
    <form onSubmit={onSubmit} className="space-y-6 mb-1 text-start">
      <div className="min-w-[250px]">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your ID</label>
        <input
          type="text"
          name="username"
          value={id}
          onChange={setId}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          placeholder=""
          required
          autoComplete="username"
        ></input>
      </div>
      <div className="w-full">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Your password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={setPassword}
          placeholder="••••••••"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          required
          autoComplete="new-password"
        ></input>
      </div>
      {lostPassword}
      <button
        type="submit"
        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Login to your account
      </button>
    </form>
  );
};

export default LoginForm;