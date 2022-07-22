import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../app/store';

export const expensesApi = createApi({
    reducerPath: "expenseApi",
    baseQuery: fetchBaseQuery({
        baseUrl: '/expenses',
        mode: 'cors',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.accessToken
            // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    endpoints: (build) => ({
        getExpenses: build.query<any, any>({
            query: () => ({
                url: '/',
                method: 'GET',
            }),
        }),
    }),
});

export const { useGetExpensesQuery } = expensesApi;