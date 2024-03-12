export default interface registerUser {
  data: {
    register: {
      message: string
      user: {
        id: string
        username: string
        email: string
      }
    }
  }
}
