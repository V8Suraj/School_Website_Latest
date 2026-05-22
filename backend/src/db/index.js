import mongoose from 'mongoose'
import { appName, mongoUrl } from '../utils/config.js'

 const connectDB = async() => {
      try {
        const promise = await mongoose.connect(`${mongoUrl}`)
        console.log("mongoose connection string ",mongoUrl)
        // console.log("mongoose connection string ",mongoose.connection)
        return promise
      } catch (error) {
            console.error(`Error: ${error.message}`)
            process.exit(1)
      }
}

export default connectDB;
