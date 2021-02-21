import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import dogReducer from '../features/dogs/dogSlice';

export const store = configureStore({
  reducer: {
    dogs: dogReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
