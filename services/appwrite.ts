import { Client, Databases, ID, Query } from 'appwrite'

// track the searches made by users

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite endpoint
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);

export const UpdateSearchCount = async(query:string,movie:Movie)=>{
    try{

        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal('searchTerm',query)
        ])
        
        // checking if the user has searched for the movie before
        if (result.documents.length>0){
            const existingMovie = result.documents[0]
            
            await database.updateDocument(
                DATABASE_ID,
                COLLECTION_ID,
                existingMovie.$id,
                {
                    count:existingMovie.count + 1,
                }
            )
        }else{
            await database.createDocument(
                DATABASE_ID,
                COLLECTION_ID,
                ID.unique(),
                {
                    searchTerm:query,
                    movieId:movie.id,
                    count:1,
                    title:movie.title,
                    posterURL:`https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                }
            )
        }
    } catch (error){
        console.error('Error updating search count:', error);
        throw error;
    }

}