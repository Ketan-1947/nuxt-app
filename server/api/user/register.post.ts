import { createUser } from '../../services/userLogic.js'
import { connectDB } from '../../utils/connectDb.js'

export default defineEventHandler(async (event) => {
  await connectDB()

  const user = await readBody(event)
  const created = await createUser(user)

  setResponseStatus(event, created.code)
  return {
    status: created.code,
    error: created.error,
  }
})