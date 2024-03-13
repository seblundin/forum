import { Thread } from '../types/Types'

export default interface ThreadResponse {
  data: {
    threads: Thread[]
  }
}
