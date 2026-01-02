import mongoose from "mongoose"

let isConnected = false

let MONGODB_URI = process.env.MONGODB_URL as string

async function connectToDB() {

    if (isConnected) {
        console.log("Already connected to MongoDB")
        return
    }

    try {
        await mongoose.connect(MONGODB_URI as string)
        console.log("Connected to MongoDB")
        isConnected = true
    } catch (error) {
        console.log("Failed to connect to MongoDB", error)
    }
}

export default connectToDB