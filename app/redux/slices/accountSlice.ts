import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '@/api/axios';
import { getGoogleLogin, getKaKaoLogin, getLogout, postLogin } from './loginSlice';
import { Gender } from '../enum';
import { serverToClientMapper } from '../dto/mapper';
import { updateLikeList } from './updateLikeList';
import _ from 'lodash';
import { RootState } from '../store';

export interface AccountState {
  user: any;
  password: string;
  reEnterPassword: string;
  loading: boolean;
  error: string | null;
}

export const initialState = {
  user: {
    id: '',
    loginId: '',
    firstname: '',
    lastname: '',
    email: '',
    age: 1,
    gender: Gender.NONE,
    sexualPreference: Gender.ALL,
    introduction: '',
    pictures: [],
    interests: [],
    hateInterests: [],
    emoji: [],
    hateEmoji: [],
    simillar: true
  },
  password: '',
  reEnterPassword: '',
  loading: false,
  error: null
};

// 내 정보 가져오기
export const getMyAccount = createAsyncThunk<any>('accountSlice/getMyAccount', async () => {
  const response = await axiosInstance.get('/user/profile');
  const user = serverToClientMapper(response.data);
  return user;
});

// 유저 프로필 정보 서버로 전송
export const patchUserProfile = createAsyncThunk('accountSlice/patchUserProfile', async (_, { getState }) => {
  const state = getState() as { accountSlice: AccountState };
  const user = state.accountSlice.user;
  const password = state.accountSlice.password;
  const response = await axiosInstance.patch('/user/profile', {
    pictures: user.pictures, // backend: 배열형태로 보내주세요.
    gender: parseInt(user.gender), // backend: 숫자형태로 보내주세요.
    taste: parseInt(user.sexualPreference), // backend: 숫자형태로 보내주세요.
    bio: user.introduction,
    tags: user.interests,
    emoji: user.emoji,
    hate_emoji: user.hateEmoji,
    name: user.firstname,
    last_name: user.lastname ?? '',
    age: user.age,
    pw: password,
    email: user.email
  });
  return serverToClientMapper(response.data);
});

export const saveIdToLocalStorage = (id: string) => {
  localStorage.setItem('id', id);
};

// 비밀번호 재설정하기
export const postResetPassword = createAsyncThunk(
  'accountSlice/postResetPassword',
  async (key: string, { getState }) => {
    // 패스워드 직접 받는 것으로 변경 필요 -- test --
    // const state = getState() as { accountSlice: AccountState };
    // const password = state.accountSlice.user.password;
    const response = await axiosInstance.post(`/user/reset-pw?key=${key}`, {
      // pw: password
    });
    return response.status;
  }
);

const accountSlice = createSlice({
  name: 'accountSlice',
  initialState,
  reducers: {
    // setAccountId: (state: AccountState, action: PayloadAction<number>) => {
    //   state.user.id = action.payload;
    // },
    setAccountLoginId: (state: AccountState, action: PayloadAction<string>) => {
      state.user.loginId = action.payload;
    },
    setAccountPassword: (state: AccountState, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setAccountGender: (state: AccountState, action: PayloadAction<string>) => {
      const value = parseInt(action.payload);
      state.user.gender = value;
    },
    setAccountAge: (state: AccountState, action: PayloadAction<number>) => {
      if (action.payload < 0 || action.payload > 100) return;
      state.user.age = action.payload;
    },
    setAccountFirstname: (state: AccountState, action: PayloadAction<string>) => {
      state.user.firstname = action.payload;
    },
    setAccountLastname: (state: AccountState, action: PayloadAction<string>) => {
      state.user.lastname = action.payload;
    },
    setAccountEmail: (state: AccountState, action: PayloadAction<string>) => {
      state.user.email = action.payload;
    },
    setAccountReEnterPassword: (state: AccountState, action: PayloadAction<string>) => {
      state.reEnterPassword = action.payload;
    },
    setAccountSexualPreference: (state: AccountState, action: PayloadAction<string>) => {
      const value = parseInt(action.payload);
      state.user.sexualPreference = value;
    },
    setAccountIntroduction: (state: AccountState, action: PayloadAction<string>) => {
      state.user.introduction = action.payload;
    },
    addAccountPhotos: (state: AccountState, action: PayloadAction<[]>) => {
      state.user.pictures = [...state.user.pictures, ...action.payload];
    },
    removeAccountPhotos: (state: AccountState, action: PayloadAction<number>) => {
      state.user.pictures = state.user.pictures.filter((_: any, index: number) => index !== action.payload);
    },
    setAccountEmoji: (state: AccountState, action: PayloadAction<number>) => {
      updateLikeList({
        state: state,
        action: action,
        property: 'emoji',
        oppositeType: 'hateEmoji'
      });
    },
    setAccountHateEmoji: (state: AccountState, action: PayloadAction<number>) => {
      updateLikeList({
        state: state,
        action: action,
        property: 'hateEmoji',
        oppositeType: 'emoji'
      });
    },
    setAccountInterests: (state: AccountState, action: PayloadAction<number>) => {
      updateLikeList({
        state: state,
        action: action,
        property: 'interests',
        oppositeType: 'hateInterests'
      });
    },
    setAccountHateInterests: (state: AccountState, action: PayloadAction<number>) => {
      updateLikeList({
        state: state,
        action: action,
        property: 'hateInterests',
        oppositeType: 'interests'
      });
    }
  },
  extraReducers: builder => {
    // 내정보 가져오기
    builder.addCase(getMyAccount.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getMyAccount.fulfilled, (state, action) => {
      state.user = { ...state.user, ...action.payload };
      state.loading = false;
    });
    builder.addCase(getMyAccount.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? null;
    });

    // 이메일 로그인
    builder.addCase(postLogin.fulfilled, (state, action) => {
      state.user = { ...state.user, ...action.payload };
      saveIdToLocalStorage(action.payload.id);
    });
    // 구글 로그인
    builder.addCase(getGoogleLogin.fulfilled, (state, action) => {
      state.user = { ...state.user, ...action.payload };
      saveIdToLocalStorage(action.payload.id);
    });
    // 카카오 로그인
    builder.addCase(getKaKaoLogin.fulfilled, (state, action) => {
      state.user = { ...state.user, ...action.payload };
      saveIdToLocalStorage(action.payload.id);
    });

    // 비밀번호 재설정하기
    builder.addCase(postResetPassword.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(postResetPassword.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(postResetPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? null;
    });
  }
});

export const {
  // setAccountId,
  setAccountLoginId,
  setAccountPassword,
  setAccountEmail,
  setAccountFirstname,
  setAccountLastname,
  setAccountReEnterPassword,
  setAccountAge,
  setAccountGender,
  setAccountSexualPreference,
  setAccountEmoji,
  setAccountHateEmoji,
  setAccountInterests,
  setAccountHateInterests,
  setAccountIntroduction,
  addAccountPhotos,
  removeAccountPhotos
} = accountSlice.actions;
export const extraReducers = accountSlice.reducer;

export default accountSlice.reducer;
