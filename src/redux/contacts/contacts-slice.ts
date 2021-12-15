import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://61ac9aa5d228a9001703ab59.mockapi.io' }),
  tagTypes: ['Contact'],
  endpoints: (builder) => ({
    getContacts: builder.query({
        query: (filterStr) => `contacts?sortBy=name&name=${filterStr}`,
        providesTags: ['Contact']
    }),
      deleteContact: builder.mutation({
          query: (id) => ({
              url: `/contacts/${id}`,
              method: "DELETE",
          }),
          invalidatesTags: ['Contact']
      }),
      createContact: builder.mutation({
          query: (newContact) => ({
              url: '/contacts',
              method: 'POST',
              body: newContact
          }),
          invalidatesTags: ['Contact']
      })
  }),
})

export const { useGetContactsQuery, useDeleteContactMutation, useCreateContactMutation } = contactsApi;