import {User} from './User';

interface Thread {
  id: string;
  title?: string;
  content: string;
  uploadtime: Date;
  mediacontent?: string;
  owner: User;
  parent?: Thread;
}

interface TheadOutput {
  id: string;
  title?: string;
  content: string;
  uploadtime: Date;
  mediacontent?: string;
  owner: User;
}

interface ThreadInput {
  title: string;
  content: string;
  uploadtime: Date;
  mediacontent?: string;
  owner: User;
}

interface CommentOutput {
  id: string;
  content: string;
  uploadtime: Date;
  mediacontent?: string;
  owner: User;
  parent: Thread;
}

interface CommentInput {
  content: string;
  uploadtime: Date;
  mediacontent?: string;
  owner: User;
  parent: Thread;
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
