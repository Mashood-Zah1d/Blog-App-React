import { Account, Client, ID } from 'appwrite';
import conf from '../Conf/Conf'
class Authentication {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.APPWRITE_URL)
            .setProject(conf.APPWRITE_PROJECT_ID)

        this.account = new Account(this.client)
    }

    async Signup({ name, email, password }) {
        try {
         const userAccount = await this.account.create(ID.unique(), email, password, name);
         if (userAccount) {
            
         }
         else{
            return userAccount;
         }
        } catch (error) {
            console.log("APPWRITE:: ERROR : " +error)
        }
        
    }

    async login ({email,password}) {
        try {
          return  await this.account.createEmailPasswordSession(email,password)
        } catch (error) {
            console.log("APPWRITE:: ERROR : " +error)
        }
    }

    async getUser () {
        try {
        return await this.account.get();    
        } catch (error) {
            console.log("Appwrite::geting User : Error"+error);
            return null
        }
        
    }

    async logout () {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite::Didn't Logout : Error" +err)
        }
    }

}
 const authentication = new Authentication();
export default authentication