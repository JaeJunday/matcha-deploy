import { Auth, Route } from '@/redux/enum';
import axiosInstance from './axios';

const handleAuthError = async (error: any) => {
  const flag = checkInvalidStatus(error.response.data.msg);

  if (flag === Auth.accessToken) {
    return reRequest(error.config);
  } else if (flag === Auth.refreshToken) {
    redirectLogin();
    alert('로그인 후 이용해주세요.');
  }

  return Promise.reject(error);
};

// 토큰 에러 종류 분류 로직
const checkInvalidStatus = (message: any) => {
  // 리프레시 플래그를 제외한 나머지 플래그는 전부 재요청 필요
  if (message && message.includes('refresh')) {
    return Auth.refreshToken;
  } else {
    return Auth.accessToken;
  }
};

// 토큰 재발급 요청
const reGenerateToken = async () => {
  try {
    await axiosInstance.patch('/user/reset-token', null, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    throw error;
  }
};

// 토큰 재발급 후 재요청
const reRequest = async (originalRequestConfig: any) => {
  try {
    await reGenerateToken();
    return axiosInstance(originalRequestConfig);
  } catch (error) {
    redirectLogin();
  }
};

// 재 로그인 유저 리다이렉트
export const redirectLogin = () => {
  window.location.href = Route.LOGIN;
};

export default handleAuthError;
