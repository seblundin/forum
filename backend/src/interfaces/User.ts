interface User extends Document {
  id: string;
  user_name: string;
  email: string;
  password: string;
}

interface UserOutput {
  id: string;
  user_name: string;
  email: string;
}

interface UserInput {
  user_name: string;
  email: string;
  password?: string;
}

interface LoginUser {
  id: string;
  user_name: string;
  email: string;
}

interface TokenContent {
  token: string;
  user: LoginUser;
}

export {User, UserOutput, UserInput, LoginUser, TokenContent};
