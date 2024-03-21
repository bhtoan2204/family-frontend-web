import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux'
import testReducer from './testSlice';

import userProfileSlice from './user/userProfile/userProfileSlice';
import getAllFamilySlice from './family/getAllFamily/getAllFamilySlice';
import getFamilyDetailSlice from './family/familyDetail/getFamilyDetailSlice';
const store = configureStore({
    reducer: {
        test: testReducer, // Key là tên của reducer, value là reducer tương ứng
        userProfile: userProfileSlice,
        getAllFamily: getAllFamilySlice,
        getFamilyDetail: getFamilyDetailSlice
    },
});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch // Export a hook that can be reused to resolve types

export default store;
