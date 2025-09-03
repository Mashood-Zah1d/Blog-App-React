import {Client,Databases, Query,Storage,ID} from 'appwrite'
import conf from '../Conf/Conf'

class Service {
    client = new Client();
    databases;
    storage

    constructor(){
        this.client
        .setEndpoint(conf.APPWRITE_URL)
        .setProject(conf.APPWRITE_PROJECT_ID)

        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost ({title,slug,content,featuredImage,status,userId}){
       try {
        return await this.databases.createDocument(
            conf.APPWRITE_DATABASE_ID,
            conf.APPWRITE_COLLECTION_ID,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
                userId
            }
        )
       } catch (error) {
         console.log("AppWrite::Error Creating Post : Error" +error)
         throw error
       }
    }

    async updatePost (slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(
            conf.APPWRITE_DATABASE_ID,
            conf.APPWRITE_COLLECTION_ID,
            slug,
            {
              title,
              content,
              featuredImage,
              status
            }
        )
        } catch (error) {
            console.log("APPWRITE::ERROR UPDATING : ERROR"+error)
        }
       
    }

    async getallPost(){
        try {
            return await this.databases.listDocuments(
                conf.APPWRITE_DATABASE_ID,
                conf.APPWRITE_COLLECTION_ID,
                [Query.equal("status",["active"])]
            )
        } catch (error) {
            console.log("APPWRITE:: ERROR GETTING :: ERROR"+error);
            throw error
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
             conf.APPWRITE_DATABASE_ID,
             conf.APPWRITE_COLLECTION_ID,
             slug
            )
        } catch (error) {
            console.log("APPWRITE :: ERROR GETTING :: ERROR"+error);
            throw error
            
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
               conf.APPWRITE_DATABASE_ID,
                conf.APPWRITE_COLLECTION_ID,
                slug
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            throw error;
         }
    }
    
    async uploadPhoto(file){
        try {
            return await this.storage.createFile(
                conf.APPWRITE_STORAGE_ID,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("APPWRITE::ERROR UPLOADING:ERROR"+error);
            throw error
        }
    }

     getFilePreview (file) {
        try {
            return this.storage.getFileView(
            conf.APPWRITE_STORAGE_ID,
            file
        )
        } catch (error) {
            console.log("APPWRITE::ERROR GETTING FILE :: ERROR"+error);
            throw error;
        }
    }

    async deleteFile(file){
    try {
        await this.storage.deleteFile(
            conf.APPWRITE_STORAGE_ID,
            file
        )
        return true
    } catch (error) {
        console.log("APPWRITE::ERROR DELETING PHOTO :: ERROR"+error);
        throw error;
    }
    }
}

const service = new Service();

export default service