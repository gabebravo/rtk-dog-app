import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import breedsReducer from './breedsReducer';

export const store = configureStore({
  reducer: {
    dogs: breedsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
