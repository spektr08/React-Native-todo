import { ID, Client, Account} from 'appwrite';
import SnackBar from 'react-native-snackbar'


const appwriteClient = new Client();

type CreateUserAccount = {
    email: string;
    password: string;
    name: string
}

type LoginUserAccount = {
    email: string;
    password: string;
}
const project_id = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID;
const endpoint = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT;

class AppwriteService {
    account;

    constructor() {
        appwriteClient
            .setEndpoint(endpoint)
            .setProject(project_id);

        this.account = new Account(appwriteClient);    
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
            // SnackBar.show({
            //     text: String(error),
            //     duration: LENGTH_LONG
            // });
            console.log("Appwrite service :: createAccunt() :: " + error);
        }
    }

    async login({email, password} : LoginUserAccount) {
        try {
            return await this.account.createEmailSession(email, password);        
        } catch(error) {
            // SnackBar.show({
            //     text: String(error),
            //     duration: SnackBar.LENGTH_LONG
            // });
            console.log("Appwrite service :: login() :: " + error);
        }
    }


    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch(error) {
            // SnackBar.show({
            //     text: String(error),
            //     duration: SnackBar.LENGTH_LONG
            // });
            console.log("Appwrite service :: getCurrentUser() :: " + error);
        }
    }

    async logout(){
        try {
            return await this.account.deleteSession('current');
        } catch(error) {
            // SnackBar.show({
            //     text: String(error),
            //     duration: SnackBar.LENGTH_LONG
            // });
            console.log("Appwrite service :: logout() :: " + error);
        }
    }
}

export default AppwriteService;

