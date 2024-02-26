'use client';

import { useDispatch } from 'react-redux';
import GenderRadioList from './GenderRadioList';
import SexualPreferenceRadioList from './SexualPreferenceRadioList';
import { setCurrentStep, signupSteps } from '../../store/slices/signupSlice';

const PersonalInfoForm: React.FC = () => {
  const dispatch = useDispatch();
  const handleNextStep = () => {
    dispatch(setCurrentStep(signupSteps.EmojiInfo));
  };
  return (
    <form className="max-w-sm min-w-96 min-h-96 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <h5 className="text-lg font-semibold mb-5 underline decoration-wavy decoration-blue-500/50">
        원활한 매칭을 위한 정보입니다.
      </h5>
      <fieldset className="mb-5">
        <legend className="block text-sm font-medium text-gray-900 dark:text-white">
          성별 정보
        </legend>
        <GenderRadioList />
      </fieldset>
      <fieldset className="mb-5">
        <legend className="block text-sm font-medium text-gray-900 dark:text-white">
          성적 취향
        </legend>
        <SexualPreferenceRadioList />
      </fieldset>
      <div className="mb-5">
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          한줄소개를 작성해주세요.
        </label>
        <textarea
          id="message"
          rows={4}
          className="block p-2.5 w-full min-h-36 max-h-96 text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="같이 테니스치러 갈래요?"
        ></textarea>
      </div>
      <button
        type="submit"
        className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={handleNextStep}
      >
        Submit
      </button>
    </form>
  );
};

export default PersonalInfoForm;
