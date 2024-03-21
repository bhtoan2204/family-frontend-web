import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Family } from "./type";
import axios, { AxiosRequestConfig } from "axios";

const blankFamilies: Family[] = [];

const initialState = {
  loading: true,
  data: blankFamilies,
  error: null,
};

export const fetchAllFamily = createAsyncThunk(
  "family/fetchAllFamily",
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
      const response = await axios.get("/api/family/get-all", config);

      // console.log(response.data);
      return response.data.data as Family[];
    } catch (error: any) {
      console.log("print", error);
      return rejectWithValue(error.response.data); // Trả về lỗi nếu có lỗi khi gọi API
    }
  }
);

const getAllFamilySlice = createSlice({
  name: "getAllFamily",
  initialState,
  reducers: {
    addFamily: (state, action: PayloadAction<Family>) => {},
    adjustFamily: (state, action: PayloadAction<Family>) => {
      const index = state.data.findIndex(
        (family) => family.id_family === action.payload.id_family
      );
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
    deleteFamily: (state, action: PayloadAction<number>) => {
      state.data = state.data.filter(
        (family) => family.id_family !== action.payload
      );
    },
    setError: (state, action: PayloadAction<any>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Xử lý khi gọi API thành công
    builder.addCase(fetchAllFamily.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAllFamily.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload; // Lưu dữ liệu user profile từ kết quả API
    });
    builder.addCase(fetchAllFamily.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as any; // Fix the type error by explicitly typing 'error' as 'any'
    });
  },
});

export const fetchAllFamilyActions = getAllFamilySlice.actions;
export default getAllFamilySlice.reducer;
