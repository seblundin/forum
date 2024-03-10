import {Document} from 'mongoose';
interface User extends Document {
  username: string;
  email: string;
  role: 'user' | 'admin';
  password: string;
}

interface OutputUser {
  id: string;
  username: string;
  email: string;
}

export {User, OutputUser};
