import { Client, Databases, Query, ID, Account } from 'appwrite';

const APPWRITE_ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const APPWRITE_PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const APPWRITE_DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const APPWRITE_FACILITATOR_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_FACILITATOR_COLLECTION_ID;

const client = new Client();
client
    .setEndpoint(APPWRITE_ENDPOINT) // Your API Endpoint
    .setProject(APPWRITE_PROJECT_ID); // Your project ID

const database = new Databases(client);
const account = new Account(client);

const appwrite = {
    client,
    account,
    database,
    Query,
    ID, // <-- Add ID here

    APPWRITE_PROJECT_ID,
    DATABASE: {
        ID: APPWRITE_DATABASE_ID,
        COLLECTIONS: {
            FACILITATORS: APPWRITE_FACILITATOR_COLLECTION_ID,
            USERS: 'users',
            COURSES: 'courses',
            ENROLLMENTS: 'enrollments',
            PAYMENTS: 'payments',
        },
    }
}

export default appwrite;