import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {
    Ticket
} from "@/lib/interfaces/ticket";

export const ticketsApi = createApi({
    reducerPath: 'expenseApi',
    tagTypes: ['Tickets'],
    baseQuery: fetchBaseQuery({baseUrl: process.env.HOST}),
    endpoints: (builder) => ({
        getTickets: builder.query<Ticket[], void>({
            query: () => '/api/ticket',
        })
    })
})

export const {
    useGetTicketsQuery
} = ticketsApi
