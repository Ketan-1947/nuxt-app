import { createMessage } from '../../services/messageLogic.js'
import { connectDB } from '../../utils/connectDb.js'

export default defineEventHandler(async (event) => {
  await connectDB()

  const message = await readBody(event)
  const created = await createMessage(message)

  setResponseStatus(event, created.code)
  return {
    status: created.code,
    id: created.id,
  }
})