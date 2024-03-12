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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface UserTest extends Partial<User> {}

export {User, UserOutput, UserInput, LoginUser, TokenContent, UserTest};
