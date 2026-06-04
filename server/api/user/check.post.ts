import { verifyUser } from '../../services/userLogic.js'
import { connectDB } from '../../utils/connectDb.js'

export default defineEventHandler(async (event) => {
  await connectDB()

  const user = await readBody(event)
  const response = await verifyUser(user)

  setResponseStatus(event, response.code)
  return {
    status: response.code,
    error: response.error,
  }
})