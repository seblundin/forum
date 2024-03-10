export default interface LoginResponse {
  data: {
    login: {
      token: string
      message: string
      user: {
        email: string
        username: string
        id: string
      }
    }
  }
}
