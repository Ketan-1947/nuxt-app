import {getAllMessage} from "../services/messageLogic.js"
import { connectDB } from "../utils/connectDb.js"

export default defineEventHandler(async (event) =>{
    await connectDB()
    const data = await getAllMessage()
    return data;
})  
