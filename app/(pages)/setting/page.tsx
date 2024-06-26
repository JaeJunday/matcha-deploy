'use client';

import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AccordionItems, SubmitButton } from '@/ui';
import InterestsSelector from '@/auth/signup/components/InterestsSelector';
import EmojiGridList from '@/auth/upload/emoji/EmojiGridList';
import ReEnterPassword from '../forms/ReEnterPassword';
import ImageUploadGrid from './components/ImageUploadGrid';
import {
  AgeInput,
  EmailInput,
  GenderRadioInput,
  IntroductionInput,
  PasswordInput,
  SexualPreferenceRadioInput,
  UserNameInput
} from '../forms';
import {
  setAccountEmoji,
  setAccountHateEmoji,
  setAccountHateInterests,
  setAccountInterests
} from '@/redux/slices/account/accountSlice';
import { RootState } from '@/redux/store';
import { submitProfile } from './submitprofile';
import { patchUserProfile } from '@/redux/slices/login/loginExtraReducers';
import { getMyAccount } from '@/redux/slices/account/accountExtraReducers';
import SimilarRadioInput from '../forms/SimilarRadioInput';
import usePasswordValidMessage from './hooks/useValidMessage';
import ImageUploadCube from './components/ImageUploadCube';

const Setting: React.FC = () => {
  const account = useSelector((state: RootState) => state.accountSlice);
  const user = useSelector((state: RootState) => state.accountSlice.user);
  const dispatch = useDispatch();

  // 내정보 가져와서 표시
  useLayoutEffect(() => {
    dispatch<any>(getMyAccount());
  }, []);

  const updateUser = () => {
    const data = {
      gender: Number(user.gender), // backend: 숫자형태로 보내주세요.
      taste: Number(user.sexualPreference), // backend: 숫자형태로 보내주세요.
      pictures: user.pictures, // backend: 배열형태로 보내주세요.
      bio: user.introduction,
      tags: user.interests,
      emoji: user.emoji,
      hate_emoji: user.hateEmoji,
      name: user.firstname,
      last_name: user.lastname ?? '',
      age: user.age,
      email: user.email,
      pw: account.password
    };
    dispatch<any>(patchUserProfile(data));
  };

  // 비밀번호 유효성 검사, 에러메시지 표시
  const errorMessage = usePasswordValidMessage();

  return (
    <div className="flex min-h-screen bg-green-50">
      <div className="flex-col justify-center mx-auto m-40 md:grid md:grid-cols-2 md:gap-8">
        <div>
          {/* <ImageUploadGrid /> */}
          <ImageUploadCube />
          <p className="flex justify-center text-gray-700"> ⤷ 프로필을 좌우로 회전시켜 보세요 ⤷ </p>
          <div className="mb-10"></div>
        </div>

        <form
          className="flex flex-col justify-start items-center max-h-96"
          onSubmit={e => {
            e.preventDefault();
            submitProfile(user.pictures, updateUser);
          }}
        >
          <AccordionItems
            items={[
              {
                title: '이름변경',
                content: <UserNameInput />
              },
              {
                title: '나이 재설정',
                content: <AgeInput />
              },
              {
                title: '비밀번호 재설정',
                content: (
                  <>
                    {errorMessage && <div className="text-red-500 mb-1">{errorMessage}</div>}
                    <PasswordInput />
                    <ReEnterPassword stateColor={errorMessage.length ? 'bg-red-500' : 'bg-green-500'} />
                  </>
                )
              },
              {
                title: '나의 성별 선택',
                content: <GenderRadioInput />
              },
              {
                title: '성적 취향 선택',
                content: <SexualPreferenceRadioInput />
              },
              {
                title: '비슷한 유저를 만나고 싶은가요?',
                content: <SimilarRadioInput />
              },
              {
                title: '나의 관심사 태그를 선택해주세요.',
                content: (
                  <InterestsSelector
                    who={'me'}
                    interests={user.interests}
                    onClick={e => dispatch(setAccountInterests(e))}
                  />
                )
              },
              {
                title: '싫어하는 관심사 태그를 선택해주세요.',
                content: (
                  <InterestsSelector
                    who={'me'}
                    interests={user.hateInterests}
                    onClick={e => dispatch(setAccountHateInterests(e))}
                  />
                )
              },
              {
                title: '선호하는 이모티콘을 설정해주세요. (최대 4개)',
                content: <EmojiGridList who={'me'} emoji={user.emoji} onClick={e => dispatch(setAccountEmoji(e))} />
              },
              {
                title: '싫어하는 이모티콘을 설정해주세요. (최대 4개)',
                content: (
                  <EmojiGridList who={'me'} emoji={user.hateEmoji} onClick={e => dispatch(setAccountHateEmoji(e))} />
                )
              },
              { title: '자기소개를 작성해주세요.', content: <IntroductionInput /> },
              { title: '이메일을 변경하세요.', content: <EmailInput /> }
            ]}
          />
          <div className="mb-5"></div>
          <SubmitButton text="Save" />
        </form>
      </div>
    </div>
  );
};

export default Setting;
