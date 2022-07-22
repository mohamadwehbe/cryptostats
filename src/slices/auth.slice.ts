import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { User } from "../models/User";

interface AuthState {
    user?: User,
    accessToken?: string,
}

const slice = createSlice({
    name: 'auth',
    initialState: {} as AuthState,
    reducers: {
        setAuthState: (state, { payload: { user } }: PayloadAction<AuthState>) => {
            state.user = user;
            state.accessToken = user?.accessToken;
        }
    }
})

export const { setAuthState } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;