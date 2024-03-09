import {Types} from 'mongoose';
import {User} from './User';

interface Thread {
  id: string;
  title?: string;
  content: string;
  uploadtime: Date;
  mediacontent?: string;
  owner: Types.ObjectId | User;
  parent?: Types.ObjectId | Thread;
}

interface TheadOutput {
  id: string;
  title?: string;
  content: string;
  uploadtime: Date;
  mediacontent?: string;
  owner: Types.ObjectId | User;
}

interface ThreadInput {
  title: string;
  content: string;
  uploadtime: Date;
  mediacontent?: string;
}

interface CommentOutput {
  id: string;
  content: string;
  uploadtime: Date;
  mediacontent?: string;
  owner: Types.ObjectId | User;
  parent: Types.ObjectId | Thread;
}

interface CommentInput {
  content: string;
  uploadtime: Date;
  mediacontent?: string;
  parent: Types.ObjectId | Thread;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ThreadTest extends Partial<Thread> {}

export {
  Thread,
  TheadOutput,
  ThreadInput,
  CommentOutput,
  CommentInput,
  ThreadTest,
};
