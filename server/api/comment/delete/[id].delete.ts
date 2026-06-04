import { deleteComment } from '../../../services/commentsLogic.js'
import { connectDB } from '../../../utils/connectDb.js'

export default defineEventHandler(async (event) => {
  await connectDB()

  const id = getRouterParam(event, 'id')
  const deleted = await deleteComment(id)

  setResponseStatus(event, deleted.code)
  return {
    status: deleted.code,
    data: deleted.data,
  }
})