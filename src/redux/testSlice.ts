import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define interface cho state của reducer
interface CounterState {
  value: number;
}

// Khởi tạo initial state
const initialState: CounterState = {
  value: 0,
};

// Tạo slice
const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    // Action để tăng giá trị
    increment(state) {
      state.value += 1;
    },
    // Action để giảm giá trị
    decrement(state) {
      state.value -= 1;
    },
    // Action với payload, ở đây là số lượng để tăng hoặc giảm
    incrementByAmount(state, action: PayloadAction<number>) {
      state.value += action.payload;
    },
  },
});

// Export actions và reducer
export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;