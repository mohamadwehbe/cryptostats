import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../app/store';
import { CreateExpenseRequest } from '../dto/create-expense.dto';

export const expensesApi = createApi({
    reducerPath: "expenseApi",
    baseQuery: fetchBaseQuery({
        baseUrl: '/expenses',
        mode: 'cors',
        prepareHeaders: (headers, { getState }) => {
            const token = localStorage.getItem("accessToken");
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
        addExpense: build.mutation<any, CreateExpenseRequest>({
            query: (createExpenseRequest) => ({
                url: '/',
                method: 'POST',
                body: createExpenseRequest,
            })
        }),
        updateExpense: build.mutation<any, { id: string, post: CreateExpenseRequest }>({
            query: ({ post, id }) => ({
                url: `/${id}`,
                method: 'PATCH',
                body: post,
            })
        }),
        deleteExpense: build.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            })
        })
    }),
});

export const statusesApi = createApi({
    reducerPath: "statusApi",
    baseQuery: fetchBaseQuery({
        baseUrl: '/statuses',
        mode: 'cors',
        prepareHeaders: (headers, { getState }) => {
            const token = localStorage.getItem("accessToken");
            // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    endpoints: (build) => ({
        getStatuses: build.query<any, any>({
            query: () => ({
                url: '/',
                method: 'GET',
            }),
        }),
    }),
});

export const typesApi = createApi({
    reducerPath: "typeApi",
    baseQuery: fetchBaseQuery({
        baseUrl: '/types',
        mode: 'cors',
        prepareHeaders: (headers, { getState }) => {
            const token = localStorage.getItem("accessToken");
            // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    endpoints: (build) => ({
        getTypes: build.query<any, any>({
            query: () => ({
                url: '/',
                method: 'GET',
            }),
        }),
    }),
});

export const { useGetExpensesQuery, useAddExpenseMutation, useUpdateExpenseMutation, useDeleteExpenseMutation } = expensesApi;

export const { useGetStatusesQuery } = statusesApi;

export const { useGetTypesQuery } = typesApi;