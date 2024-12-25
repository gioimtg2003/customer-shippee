import { IUserSession } from '@/interfaces';
import { createSlice } from '@reduxjs/toolkit';
import { me } from './auth.thunk';

// Type for our state
export interface IAuthState {
  user?: IUserSession | null;
  isLoading?: boolean;
}

// Initial state
const initialState: IAuthState = {
  user: null,
  isLoading: true,
};

// Actual Slice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },

    login: (state, action) => {
      console.log('action Login', action);
      state.user = action.payload;
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: (builder) => {
    builder.addCase(me.fulfilled, (state, action) => {
      const user = action.payload;
      state.user = user;
      console.log('action', action);
      state.isLoading = false;
    });

    builder.addCase(me.rejected, (state) => {
      state.user = null;
      state.isLoading = false;
    });

    builder.addCase(me.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export const authReducer = authSlice.reducer;
export const { logout, login } = authSlice.actions;
