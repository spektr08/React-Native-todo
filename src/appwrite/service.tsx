import { ID } from 'appwrite';
import { account } from './client';

type CreateUserAccount = {
    email: string;
    password: string;
    name: string
}

type LoginUserAccount = {
    email: string;
    password: string;
}

class AppwriteService {
    account;

    constructor() {
        this.account = account;    
    }

    async createAccount({email, password, name} : CreateUserAccount) {
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );
            if (userAccount) {
                return this.login({email, password});
            } else {
                return userAccount;
            }
        } catch (error) {
            console.log("Appwrite service :: createAccunt() :: " + error);
        }
    }

    async login({email, password} : LoginUserAccount) {
        try {
            return await this.account.createEmailSession(email, password);        
        } catch(error) {
            console.log("Appwrite service :: login() :: " + error);
        }
    }


    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch(error) {
            console.log("Appwrite service :: getCurrentUser() :: " + error);
        }
    }

    async logout(){
        try {
            return await this.account.deleteSession('current');
        } catch(error) {
            console.log("Appwrite service :: logout() :: " + error);
        }
    }
}

export default AppwriteService;

