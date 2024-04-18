'use client';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setAccountLoginId, setAccountPassword } from '../../redux/slices/accountSlice';
import { LoginForm } from '../../(pages)/forms';
import LoginPageDetail from './LoginPageDetail';
import { postGoogleLogin, postKakaoLogin, postLogin, setIdPasswordLoginFormView } from '../../redux/slices/loginSlice';
import {
  AllSignOptionButton,
  CreateAccountButton,
  GoogleLoginButton,
  HyperBlueLink,
  KakaoLoginButton,
  LoginFormChangeButton
} from '../../UI';

const LoginPage: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const submitLogin = (event: React.FormEvent<HTMLFormElement>) => {
    /** form이 내부 상태를 가지고 있기 때문에 신뢰할 수 있는 단일 동작을 위해 폼 이벤트 방지 */
    event.preventDefault();
    dispatch<any>(postLogin());
  };

  return (
    <LoginPageDetail
      title={'Welcome to tea for two!'}
      loginMenu={
        <>
          <GoogleLoginButton onClick={() => dispatch<any>(postGoogleLogin())} />
          <KakaoLoginButton onClick={() => dispatch<any>(postKakaoLogin())} />
          <h6 className="text-md mb-2 text-gray-600"> or </h6>
          <LoginFormChangeButton text="Sign with Account" onClick={() => dispatch(setIdPasswordLoginFormView(true))} />
        </>
      }
      loginForm={
        <>
          <AllSignOptionButton onClick={() => dispatch(setIdPasswordLoginFormView(false))} />
          <LoginForm
            onSubmit={submitLogin}
            setId={e => dispatch(setAccountLoginId(e.target.value))}
            setPassword={e => dispatch(setAccountPassword(e.target.value))}
            lostPassword={<HyperBlueLink text={'Lost Password?'} onClick={() => {}} />}
            receiveEmail={<HyperBlueLink text={"Didn't receive the Email?"} onClick={() => {}} />}
          />
        </>
      }
      createAccount={<CreateAccountButton onClick={() => router.push('/auth/signup')} />}
    />
  );
};

export default LoginPage;
