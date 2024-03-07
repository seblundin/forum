import MessageResponse from './MessageResponse';
import {UserOutput} from './User';

export default interface LoginResponse extends MessageResponse {
  token: string;
  user: UserOutput;
}
