import { Thread } from '../types/Types'

export default interface CommentResponse {
  data: {
    commentsByThread: Thread[]
  }
}
