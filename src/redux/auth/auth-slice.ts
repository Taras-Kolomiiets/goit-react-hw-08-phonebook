import axios from 'axios';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

export const authApi = createApi({
  reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://connections-api.herokuapp.com' }),
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
      registerUser: builder.mutation({
          query: (credentials) => ({
              url: '/users/signup',
              method: 'POST',
              body: credentials
          }),
          invalidatesTags: ['Auth']
      }),
      loginUser: builder.mutation({
          query: (credentials) => ({
              url: '/users/login',
              method: 'POST',
              body: credentials
          }),
          invalidatesTags: ['Auth']
      }),
      logoutUser: builder.mutation({
          query: (token) => ({
              url: '/users/logout',
              method: 'POST',
              body: token
          }),
          invalidatesTags: ['Auth']
      }),
  }),
})

export const {  useRegisterUserMutation } = authApi;