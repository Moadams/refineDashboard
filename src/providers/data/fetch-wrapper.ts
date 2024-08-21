import {GraphQLFormattedError} from "graphql"

// Creating a custom fetch to improve code reusability
const customFetch = async (url:string, options:RequestInit) => {
    const accessToken = localStorage.getItem('access_token'); // Get the access token from the local storage
    const headers = options.headers as Record<string, string>; // get the headers passed from the function call
    
    // make a fetch request to the url provided adding the authorizaion, content type and apollo to the headers 
    return await fetch(url,{
        ...options,
        headers:{
            ...headers,
            Authorization: headers?.Authorization || `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            "Apollo-Require-Preflight":"true"  // to handle CORS 
        }
    })
}


// Defining a custom error type
type Error = {
    message: string,
    statusCode: string
}


// handling errors
const getGraphQLErrors = (body:Record<"errors", GraphQLFormattedError[]| undefined>): Error | null => {
    // if no body is passed, return and unknown error message
    if(!body){
        return {
            message:"Unknown Error",
            statusCode: "INTERNAL_SERVER_ERROR"
        }
    }

    // if there are errors, get the errors and combine them into one single message and return it with the error code
    if("errors" in body){
        const errors = body?.errors;
        const messages = errors?.map((error)=>error?.message).join("")
        const code = errors?.[0]?.extensions?.code

        return {
            message:messages || JSON.stringify(errors),
            statusCode:code || 500
        }
    }

    // return null if none of the above happens
    return null
}


// Defining our custom fetch wrapper
export const fetchWrapper = async (url:string, options:RequestInit) => {
    const response = await customFetch(url, options);
    const responseClone = response.clone()
    const body = await responseClone.json();

    const error = getGraphQLErrors(body);

    if(error){
        throw error
    }

    return response
}