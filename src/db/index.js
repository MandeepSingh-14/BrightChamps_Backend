import mongoose from "mongoose";

export const connectDB = async () =>{
    try {
        const db = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Database is connected with ${db.connection.host}`)
    }
    catch (error){
        console.log(error.message)
        console.log(`Database not connected`)
    }
}

