import { http } from '@/config';
import { IResponseData, IUserSession } from '@/interfaces';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const me = createAsyncThunk('auth/me', async () => {
  const response = await http
    .getInstance()
    .get<IResponseData<IUserSession>>('/customer/me');

  return response.data.data;
});
