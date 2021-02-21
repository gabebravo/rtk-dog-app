import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import dashboardReducer from './views/Dashboard/dashboardReducer';

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
