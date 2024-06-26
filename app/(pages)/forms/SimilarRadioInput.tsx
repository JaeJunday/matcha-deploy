import { setAccountSimiller } from '@/redux/slices/account/accountSlice';
import { RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';

const SimilarRadioInput = () => {
  const similar = useSelector((state: RootState) => state.accountSlice.user.similar);
  const dispatch = useDispatch();
  return (
    <div className="mb-5">
      <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex ">
        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r ">
          <div className="flex items-center ps-3">
            <input
              id="similar"
              type="radio"
              checked={similar}
              name="similar"
              onChange={() => dispatch(setAccountSimiller(true))}
              className="w-4 h-4 text-green-400 bg-gray-100 border-gray-300 focus:ring-green-400 "
              required
            />
            <label htmlFor="similar" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 ">
              나와 비슷한 사람
            </label>
          </div>
        </li>
        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r ">
          <div className="flex items-center ps-3">
            <input
              id="non-similar"
              type="radio"
              checked={!similar}
              name="similar"
              onChange={() => dispatch(setAccountSimiller(false))}
              className="w-4 h-4 text-green-400 bg-gray-100 border-gray-300 focus:ring-green-400 "
              required
            />
            <label htmlFor="non-similar" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 ">
              나와 다른 사람
            </label>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default SimilarRadioInput;
