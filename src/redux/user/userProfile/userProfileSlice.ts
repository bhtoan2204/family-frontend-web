import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProfile } from "./type";
import axios, { AxiosRequestConfig } from "axios";
interface UserProfileState {
  loading: boolean;
  data: UserProfile | null;
  error: any;
}
const blankUserProfile: UserProfile = {
  id_user: "",
  email: "",
  phone: "",
  firstname: "",
  lastname: "",
  language: "",
  twofa: false,
  created_at: "",
  updated_at: "",
  isemailverified: false,
  isphoneverified: false,
  isadmin: false,
  login_type: "",
  avatar: "",
};

const initialState = {
  loading: true,
  data: blankUserProfile,
  error: null,
};

export const fetchUserProfile = createAsyncThunk(
  "userProfile/fetchUserProfile",
  async (
    { accessToken }: { accessToken: string },
    { rejectWithValue, getState }
  ) => {
    try {
      const config: AxiosRequestConfig<any> | undefined = {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Add accessToken to the Authorization header
          Accept: "application/json", // Set the Accept header to receive JSON response
        },
      };
      const response = await axios.get("/api/user/userprofile", config);
      // console.log(response.data);
      return response.data.data as UserProfile;
    } catch (error: any) {
      return rejectWithValue(error.response.data); // Trả về lỗi nếu có lỗi khi gọi API
    }
  }
);

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    changeUserProfile(state, action) {
      state.data = action.payload;
    },
    setError(state, action: PayloadAction<any>) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Xử lý khi gọi API thành công
    builder.addCase(fetchUserProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload; // Lưu dữ liệu user profile từ kết quả API
    });
    builder.addCase(fetchUserProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as any; // Fix the type error by explicitly typing 'error' as 'any'
    });
  },
});

export const fetchUserProfileActions = userProfileSlice.actions;
export default userProfileSlice.reducer;
