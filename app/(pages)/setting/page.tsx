'use client';
import { useState } from 'react';

import GenderRadioList from '../../auth/signup/components/GenderRadioList';
import SexualPreferenceRadioList from '../../auth/signup/components/SexualPreferenceRadioList';
import TagSelector from '../../auth/signup/components/TagSelector';
import EmojiGridList from '../../auth/login/components/EmojiGridList';
import ImageUploadForm from '../../auth/signup/components/ImageUploadForm';
import PasswordInput from '../../auth/signup/components/PasswordInput';
import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import {
  setAccountAge,
  setAccountFirstname,
  setAccountGender,
  setAccountLastname,
  setAccountPassword,
  setAccountReEnterPassword,
  setAccountSexualPreference
} from '../../redux/slices/accountSlice';
import UserNameInput from '../../auth/signup/components/UserNameInput';
import AccordionItems from './AccordionItems';
import ImageUploadGrid from './ImageUploadGrid';
import AgeInput from '../../auth/signup/components/AgeInput';

const Setting: React.FC = () => {
  const user = useSelector((state: RootState) => state.accountSlice.user);
  const reEnterPassword = useSelector((state: RootState) => state.accountSlice.reEnterPassword);
  const dispatch = useDispatch();

  return (
    <div className="flex min-h-screen">
      <div className="mx-auto m-40 md:grid md:grid-cols-2 md:gap-8">
        <ImageUploadGrid />
        <div className="mx-auto w-96">
          <AccordionItems
            items={[
              {
                title: '이름변경',
                content: (
                  <UserNameInput
                    firstname={user.identity.firstname}
                    lastname={user.identity.lastname}
                    setFirstname={e => dispatch(setAccountFirstname(e.target.value))}
                    setLastname={e => dispatch(setAccountLastname(e.target.value))}
                  />
                )
              },
              {
                title: '생년월일 재설정',
                content: (
                  <AgeInput
                    age={user.ageGender.age}
                    onChange={e => dispatch(setAccountAge(parseInt(e.target.value)))}
                  />
                )
              },
              {
                title: '비밀번호 재설정',
                content: (
                  <PasswordInput
                    password={user.account.password}
                    reEnterPassword={reEnterPassword}
                    setPassword={e => dispatch(setAccountPassword(e.target.value))}
                    setReEnterPassword={e => dispatch(setAccountReEnterPassword(e.target.value))}
                  />
                )
              },
              {
                title: '나의 성별 선택',
                content: <GenderRadioList onClick={e => dispatch(setAccountGender(e.target.value))} />
              },
              {
                title: '성적 취향 선택',
                content: (
                  <SexualPreferenceRadioList onChange={e => dispatch(setAccountSexualPreference(e.target.value))} />
                )
              },
              { title: '나의 관심사 태그를 선택해주세요.', content: <TagSelector /> },
              { title: '관심있는 이모티콘을 설정해주세요.', content: <EmojiGridList /> }
            ]}
          />
          <div className="flex justify-end">
            <button
              type="button"
              className="mt-10 text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => {}}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
