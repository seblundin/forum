import {Document} from 'mongoose';
import {User} from './User';

interface Thread extends Document {
  id: string;
  title?: string;
  content: string;
  uploadtime: Date;
  mediacontent?: string;
  owner: string | User;
  parent?: string;
}

interface TheadOutput {
  id: string;
  title?: string;
  content: string;
  uploadtime: Date;
  mediacontent?: string;
  owner: string | User;
  parent?: string;
}

interface ThreadInput {
  title?: string;
  content: string;
  uploadtime: Date;
  mediacontent?: string;
  parent?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ThreadTest extends Partial<Thread> {}

export {Thread, TheadOutput, ThreadInput, ThreadTest};
