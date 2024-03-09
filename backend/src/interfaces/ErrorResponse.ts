import {MessageResponse} from './MessageInterfaces';

export default interface ErrorResponse extends MessageResponse {
  stack?: string;
}
