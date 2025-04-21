import { Client, Databases, Query, ID, Account, Permission, Role } from 'appwrite';

const APPWRITE_ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const APPWRITE_PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const APPWRITE_DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const APPWRITE_FACILITATOR_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_FACILITATOR_COLLECTION_ID;
const APPWRITE_DAILY_REPORT_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_DAILY_REPORT_COLLECTION_ID;
const APPWRITE_INDIVIDUAL_REPORT_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_INDIVIDUAL_REPORT_COLLECTION_ID;


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
    Permission,
    Role,
    APPWRITE_PROJECT_ID,
    DATABASE: {
        ID: APPWRITE_DATABASE_ID,
        COLLECTIONS: {
            FACILITATORS: APPWRITE_FACILITATOR_COLLECTION_ID,
            DAILY_REPORTS: APPWRITE_DAILY_REPORT_COLLECTION_ID,
            INDIVIDUAL_REPORTS : APPWRITE_INDIVIDUAL_REPORT_COLLECTION_ID,
        },
    }
}

export default appwrite;