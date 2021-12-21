import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://connections-api.herokuapp.com',
  }),
  tagTypes: ['Contact'],
  endpoints: builder => ({
    getContacts: builder.query({
      query: token => ({
        url: '/contacts',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['Contact'],
    }),
    deleteContact: builder.mutation({
      query: ({ id, token }) => ({
        url: `/contacts/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['Contact'],
    }),
    createContact: builder.mutation({
      query: ({ contact, token }) => ({
        url: '/contacts',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { name: contact['name'], number: contact['number'] },
      }),
      invalidatesTags: ['Contact'],
    }),
    updateContact: builder.mutation({
      query: ({ id, token, contact }) => ({
        url: `/contacts/${id}`,
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { name: contact['name'], number: contact['number'] },
      }),
      invalidatesTags: ['Contact'],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useDeleteContactMutation,
  useUpdateContactMutation,
  useCreateContactMutation,
} = contactsApi;
