// import graphql client from the nestjs-query library
import graphqlDataProvider, { GraphQLClient, liveProvider as graphqlLiveProvider } from "@refinedev/nestjs-query";
import { fetchWrapper } from "./fetch-wrapper";
import { createClient } from "graphql-ws";

export const BASE_URL = 'https://api.crm.refine.dev'
export const API_URL = `${BASE_URL}/graphql`
export const WS_URL = 'wss://api.crm.refine.dev/graphql'

export const client = new GraphQLClient(API_URL, {
    fetch: (url: string, options: RequestInit) => {
        try {
            return fetchWrapper(url, options);
        } catch (error) {
            return Promise.reject(error as Error)
        }
    }
})


// Creating a websocket client to handle realtime info
export const wsClient = typeof window !== "undefined" ? createClient({
    url: WS_URL,
    connectionParams: () => {
        const accessToken = localStorage.getItem('access_token');

        return {
            headers:{
                Authorization: `Bearer ${accessToken}`
            }
        }
    }
}) : undefined


// Create a data provider to make request to the GraphQL api
export const dataProvider = graphqlDataProvider(client)

// Create a live provider to make subscriptions to the Graphql api
export const liveProvider = wsClient ? graphqlLiveProvider(wsClient) : undefined