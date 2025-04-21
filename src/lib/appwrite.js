import { Client, Databases, Query, ID, Account } from 'appwrite';

const APPWRITE_ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const APPWRITE_PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const APPWRITE_DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;

const client = new Client();
client
    .setEndpoint(APPWRITE_ENDPOINT) // Your API Endpoint
    .setProject(APPWRITE_PROJECT_ID); // Your project ID

const database = new Databases(client);
const account = new Account(client);

const appwrite = {
    APPWRITE_PROJECT_ID,
    client,
    account,
    database,
    Query,
    ID, // <-- Add ID here
}

export default appwrite;