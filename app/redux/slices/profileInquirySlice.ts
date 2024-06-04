import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserProfileInquirySet } from '../interface';
import axiosInstance from '@/api/axios';
import { Fancy } from '../interface/enum';
import { getLogout } from './loginSlice';

interface ProfileInquiryState {
  user: any;
  profileModalVisible: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileInquiryState = {
  user: {},
  profileModalVisible: false,
  loading: false,
  error: null
};

// 유저 프로필 상세 조회
export const getProfileDetail = createAsyncThunk('profileInquirySlice/getProfileDetail', async (userId: string) => {
  const response = await axiosInstance.get(`/user/profile-detail?id=${userId}`);
  return response.data;
});

// 유저 신고
export const reportUser = createAsyncThunk('profileInquirySlice/reportUser', async (userId: string) => {
  const response = await axiosInstance.post('/user/report', {
    target_id: userId,
    reason: 0,
    reason_opt: '부정적인 단어 사용'
  });
  return response.data;
});

// 유저 차단
export const blockUser = createAsyncThunk('profileInquirySlice/blockUser', async (userId: string) => {
  const response = await axiosInstance.post('/user/block', {
    target_id: userId
  });
  return response.data;
});

const profileInquirySlice = createSlice({
  name: 'profileInquirySlice',
  initialState,
  reducers: {
    setProfileModalVisible: (state, action: PayloadAction<boolean>) => {
      state.profileModalVisible = action.payload;
    }
  },
  extraReducers: builder => {
    // 유저 프로필 상세 조회
    builder.addCase(getProfileDetail.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getProfileDetail.fulfilled, (state, action: PayloadAction<UserProfileInquirySet>) => {
      state.user = action.payload;
    });
    builder.addCase(getProfileDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? null;
    });

    // 유저 신고
    builder.addCase(reportUser.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(reportUser.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(reportUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? null;
    });

    // 유저 차단
    builder.addCase(blockUser.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(blockUser.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(blockUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? null;
    });

    // 로그아웃
    builder.addCase(getLogout.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getLogout.fulfilled, () => initialState);
    builder.addCase(getLogout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? null;
    });
  }
});

export const { setProfileModalVisible } = profileInquirySlice.actions;
export const extraReducers = profileInquirySlice.reducer;

export default profileInquirySlice.reducer;
