import { createAsyncThunk } from '@reduxjs/toolkit';

export const me = createAsyncThunk('auth/me', async () => {
  // const response = await http
  //   .getInstance()
  //   .get<IResponseData<IUserSession>>('/customer/me');

  return { user: { id: 1, email: '' } } as any;
});
