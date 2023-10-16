import { Client, Account, ID } from 'appwrite'
import confi from '../confi/confi';

export class AuthService {
    client = new Client();
    account;
    constructor() {
        this.client
            .setEndpoint(confi.appwriteUrl)
            .setProject(confi.appwriteprojectId)
        this.account = new Account(this.client);
    }
    async getCurrentAccount() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("This is error about :: getCurrentAccount", error);
        }
    }
    async CreateAccount({ email, password, name }) {
        // try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return this.Login({ email, password })

            }
            else {
                return userAccount
            }

        // } catch (error) {
        //     console.log("This is error about :: CreateAccount", error);

        // }
    }
    async Login({ email, password }) {
        // try {
            return await this.account.createEmailSession(email, password)

        // } catch (error) {
        //     console.log("This is error about :: Login", error);

        // }
    }
    async Logout() {
        try {
            return await this.account.deleteSessions()

        } catch (error) {
            console.log("This is error about :: Logout", error);
        }
    }
}

const authservice = new AuthService();
export default authservice;