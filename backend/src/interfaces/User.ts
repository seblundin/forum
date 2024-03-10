interface User extends Document {
  id: string;
  username: string;
  email: string;
  password: string;
}

interface UserOutput {
  id: string;
  username: string;
  email: string;
}

interface UserInput {
  username: string;
  email: string;
  password?: string;
}

interface LoginUser {
  id: string;
  username: string;
  email: string;
}

interface TokenContent {
  token: string;
  user: LoginUser;
}

export {User, UserOutput, UserInput, LoginUser, TokenContent};
