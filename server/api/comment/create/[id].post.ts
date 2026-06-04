import { createComment } from '../../../services/commentsLogic.js'
import { connectDB } from '../../../utils/connectDb.js'

export default defineEventHandler(async (event) => {
  await connectDB()

  const id = getRouterParam(event, 'id')
  const comment = await readBody(event)
  const created = await createComment(comment, id)

  setResponseStatus(event, created.code)
  return {
    status: created.code,
  }
})