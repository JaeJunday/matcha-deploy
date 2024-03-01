import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMaxAge, setMinAge } from '../../../../store/slices/searchValueDataSlice';
import { RootState } from '../../../../store';

const InputMinMaxAge: React.FC = () => {
  const dispatch = useDispatch();
  const minAgeState = useSelector((state: RootState) => state.searchValue.minAge);
  const maxAgeState = useSelector((state: RootState) => state.searchValue.maxAge);

  const handleMinAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const min = parseInt(e.target.value);
    dispatch(setMinAge(min));
  };

  const handleMaxAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const max = parseInt(e.target.value);
    dispatch(setMaxAge(max));
  };

  return (
    <div className="flex grid grid-rows-2 gap-y-5">
      <div className="flex flex-col items-center">
        <label htmlFor="input-min">Minimum: {minAgeState | 0}</label>
        <input
          id="input-min"
          type="number"
          className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={handleMinAgeChange}
          value={minAgeState}
          min={18}
          max={maxAgeState}
        />
      </div>
      <div className="flex flex-col items-center">
        <label htmlFor="input-max">Maximum: {maxAgeState | 0}</label>
        <input
          id="input-max"
          type="number"
          className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={handleMaxAgeChange}
          value={maxAgeState}
          min={minAgeState}
          max={100}
        />
      </div>
    </div>
  );
};

export default InputMinMaxAge;
