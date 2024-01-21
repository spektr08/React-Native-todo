import { Client, Databases, Storage, Account } from 'appwrite';



const client = new Client()
.setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT)
.setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID);;

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

export { client, account, databases, storage };
