import { FamilyDetail, Member } from "@/types/familyDetail";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { FamilyDetail, Member } from "./type";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

const blankFamilyDetail: FamilyDetail = {
  id_family: 0,
  quantity: 0,
  description: "",
  created_at: "",
  members: [],
  name: "",
  owner_id: "",
  updated_at: "",
  // Add the remaining properties here
};

const initialState = {
  loading: true,
  data: blankFamilyDetail,
  error: null,
};

export const fetchFamilyDetail = createAsyncThunk(
  "family/fetchFamilyDetail",
  async (
    { accessToken, familyId }: { accessToken: string; familyId: number },
    { rejectWithValue, getState }
  ) => {
    try {
      const config: AxiosRequestConfig<any> | undefined = {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.get(
        "/api/family/detail?id_family=" + familyId.toString(),
        config
      );
      console.log(response.data.data);
      return response.data.data;
    } catch (error: any) {
      console.log("cout<reject", error);
      return rejectWithValue(error.data.message);
    }
  }
);

const getFamilyDetailSlice = createSlice({
  name: "getFamilyDetail",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<any>) => {
      state.error = action.payload;
    },
    addMember: (state, action: PayloadAction<Member>) => {
      state.data.members.push(action.payload);
    },
    adjustMember: (
      state,
      action: PayloadAction<{ id_user: string; member: Member }>
    ) => {
      const index = state.data.members.findIndex(
        (member) => member.id_user === action.payload.id_user
      );
      if (index !== -1) {
        state.data.members[index] = action.payload.member;
      }
    },
    deleteMember: (state, action: PayloadAction<string>) => {
      const index = state.data.members.findIndex(
        (member) => member.id_user === action.payload
      );
      if (index !== -1) {
        state.data.members.splice(index, 1);
      }
    },
  },
  extraReducers: (builder) => {
    // Xử lý khi gọi API thành công
    builder.addCase(fetchFamilyDetail.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchFamilyDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload; // Lưu dữ liệu user profile từ kết quả API
    });
    builder.addCase(fetchFamilyDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as any; // Fix the type error by explicitly typing 'error' as 'any'
    });
  },
});

export const fetchFamilyDetailAction = getFamilyDetailSlice.actions;
export default getFamilyDetailSlice.reducer;
