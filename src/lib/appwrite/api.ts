import { ID, Query } from 'appwrite';
import { INewUser } from "@/types";
import { account, appwriteConfig, avatars, databases } from './config';

// Create Account
export async function createUserAccount(user: INewUser) {

    try{

        // Create a new account
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name

        );
        
        // If there's not an account
        if(!newAccount) throw Error;
        
        // Create an user from the account data
        const avatarUrl = avatars.getInitials(user.name);
        
        const newUser = await saveUserToDB({

            accountId: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
            username: user.username,
            imageUrl: avatarUrl

        })

        return newUser;

    } catch (error){
        console.log(error);
        return error;
    }
}


// Sign In
export async function signInAccount(user: {
    email: string;
    password: string;
}) {
    try {
        const session = await account.createEmailSession(user.email, user.password);
        return session
    } catch (error) {
        console.log(error);
    }
}

export async function getCurrentUser() {
    try {
        const currentAccount = await account.get();

        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollection,
            [
                Query.equal('accountId', currentAccount.$id)
            ]
        )

        if(!currentUser) throw Error;

        return currentUser.documents[0];
        
    } catch (error) {
        console.log(error);
    }
}


// Saving user to Database
export async function saveUserToDB(user: {
    accountId: string;
    email: string;
    name: string;
    imageUrl: URL;
    username?: string;
}){
    try{

        const newUser = await databases.createDocument(
            // Parameters
            appwriteConfig.databaseId,
            appwriteConfig.userCollection,
            ID.unique(),
            user
        )

        return newUser;

    } catch (error) {
        console.log(error);
    }
}