import {UserOutput} from './User';
interface MessageResponse {
  message: string;
  id?: number;
}

interface ErrorResponse extends MessageResponse {
  stack?: string;
}

interface UserResponse extends MessageResponse {
  user: UserOutput;
}

interface LoginResponse {
  token: string;
  user: UserOutput;
}

export {MessageResponse, ErrorResponse, UserResponse, LoginResponse};
