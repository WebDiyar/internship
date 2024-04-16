// store/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    email: string | null;
    uid: string | null;
}

const initialState: AuthState = {
    email: null,
    uid: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<AuthState>) => {
            state.email = action.payload.email;
            state.uid = action.payload.uid;
        },
        clearUser: (state) => {
            state.email = null;
            state.uid = null;
        }
    }
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
