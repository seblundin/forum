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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface UserTest extends Partial<User> {}

export {User, UserOutput, UserInput, LoginUser, TokenContent, UserTest};
