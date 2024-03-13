export default interface UserResponse {
  data: {
    response: {
      message: string
      user: {
        id: string
        username: string
        email: string
      }
    }
  }
}
