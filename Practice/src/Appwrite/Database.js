import confi from "../confi/confi";
import { ID, Client, Storage, Databases, Query } from "appwrite";

export class Services {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(confi.appwriteUrl)
            .setProject(confi.appwriteprojectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client)
    }
    async createPost({ title, slug, content, featureImage, userId, status = "active", name }) {
        try {
            return await this.databases.createDocument(
                confi.appwritedatabaseId,
                confi.appwritecollectionId,
                slug,
                {
                    title,
                    content,
                    featureImage,
                    userId,
                    status,
                    name
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                confi.appwritedatabaseId,
                confi.appwritecollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                confi.appwritedatabaseId,
                confi.appwritecollectionId,
                slug

            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        }
    }
    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                confi.appwritedatabaseId,
                confi.appwritecollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,

                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                confi.appwritedatabaseId,
                confi.appwritecollectionId,
                queries,
            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    // file upload service

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                confi.appwritebucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }
    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                confi.appwritebucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            confi.appwritebucketId,
            fileId
        )
    }
}

const services = new Services()

export default services