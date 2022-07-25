import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { authApi } from '../apis/auth.api';
import { expensesApi, statusesApi, typesApi } from '../apis/expenses.api';
import { usersApi } from '../apis/users.api';
import counterReducer from '../features/counter/counterSlice';
import auth from '../slices/auth.slice';

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [expensesApi.reducerPath]: expensesApi.reducer,
    [statusesApi.reducerPath]: statusesApi.reducer,
    [typesApi.reducerPath]: typesApi.reducer,
    counter: counterReducer,
    auth,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(usersApi.middleware)
      .concat(authApi.middleware)
      .concat(expensesApi.middleware)
      .concat(statusesApi.middleware)
      .concat(typesApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
