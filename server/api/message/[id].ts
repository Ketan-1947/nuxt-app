import {getMessageBody} from "../../services/messageLogic.js"
import { connectDB } from "../../utils/connectDb.js"

export default defineEventHandler(async (event) =>{
    await connectDB()
    const id = getRouterParam(event, "id")
    try {
        const body = await getMessageBody(id);
        return body
    }
    catch (e) {
        console.log(e)
        return{
            status:200,
            body:"error: internal server error!"
        }
    }
})  
