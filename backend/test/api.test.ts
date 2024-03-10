import app from '../src/app';
import {
  deleteUser,
  getSingleUser,
  getUser,
  loginUser,
  postUser,
  putUser,
} from './userFunctions';
import {
  postThread,
  putThread,
  deleteThread,
  postComment,
  putComment,
  deleteComment,
  getThreads,
  getSingleThread,
  getThreadsByOwner,
  getCommentsByThread,
} from './threadFunctions';
import mongoose from 'mongoose';
import {getNotFound} from './testFunctions';

import randomstring from 'randomstring';
import jwt from 'jsonwebtoken';
import {LoginResponse} from '../src/interfaces/MessageInterfaces';
import {UserInput, UserTest} from '../src/interfaces/User';
import {Thread, ThreadTest} from '../src/interfaces/Thread';

describe('Testing graphql api', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE_URL as string);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  // test not found
  it('responds with a not found message', async () => {
    await getNotFound(app);
  });

  // test create user
  let userData: LoginResponse;
  let userData2: LoginResponse;

  const testUser: UserTest = {
    user_name: 'Test User ' + randomstring.generate(7),
    email: randomstring.generate(9) + '@user.fi',
    password: 'testpassword',
  };

  const testUser2: UserTest = {
    user_name: 'Test User ' + randomstring.generate(7),
    email: randomstring.generate(9) + '@user.fi',
    password: 'testpassword',
  };

  // create first user
  it('should create a new user', async () => {
    await postUser(app, testUser);
  });

  // create second user
  it('should create second user', async () => {
    await postUser(app, testUser2);
  });

  // test login
  it('should login user', async () => {
    const vars = {
      credentials: {
        username: testUser.email!,
        password: testUser.password!,
      },
    };
    userData = await loginUser(app, vars);
  });

  // test login with second user
  it('should login second user', async () => {
    const vars = {
      credentials: {
        username: testUser2.email!,
        password: testUser2.password!,
      },
    };
    userData2 = await loginUser(app, vars);
  });

  // test get all users
  it('should return array of users', async () => {
    await getUser(app);
  });

  // test get single user
  it('should return single user', async () => {
    await getSingleUser(app, userData.user.id!);
  });

  // test update user
  it('should update user', async () => {
    await putUser(app, userData.token!);
  });

  // test post thread data
  // TODO: add mediacontent
  let threadId1: string;
  let threadData1: {input: ThreadTest};
  it('should post thread data', async () => {
    threadData1 = {
      input: {
        title: 'Test Title' + randomstring.generate(7),
        content: 'Test Content' + randomstring.generate(7),
        uploadtime: new Date('2022-01-01'),
        mediacontent: 'TODO',
      },
    };
    console.log(threadData1);
    const thread = await postThread(app, threadData1, userData.token!);
    threadId1 = thread.id!;
  });

  // test get all threads
  it('should return array of threads', async () => {
    await getThreads(app);
  });

  // test get single thread
  it('should return single thread', async () => {
    await getSingleThread(app, threadId1);
  });

  // get threads by user id
  it('should return threads by current user', async () => {
    await getThreadsByOwner(app, userData.user.id!);
  });

  // get threads by user id
  it('should return threads by current user', async () => {
    await getCommentsByThread(app, threadId1!);
  });

  // modify thread
  it('should modify a thread', async () => {
    const newThread: ThreadTest = {
      content: 'New Test Content' + randomstring.generate(7),
    };
    const vars = {
      input: newThread,
      threadId: threadId1,
    };
    await putThread(app, vars, userData.token!);
  });

  // delete thread
  it('should delete a thread', async () => {
    await deleteThread(app, threadId1, userData.token!);
  });

  let commentId1: string;
  let commentData1: {input: ThreadTest};
  it('should post comment data', async () => {
    commentData1 = {
      input: {
        content: 'Test Content' + randomstring.generate(7),
        uploadtime: new Date('2022-01-01'),
        mediacontent: 'TODO',
        parent: threadData1,
      },
    };
    console.log(commentData1);
    const comment = await postComment(app, commentData1, userData2.token!);
    commentId1 = comment.id!;
  });

  // modify comment
  it('should modify a comment', async () => {
    const newComment: ThreadTest = {
      content: 'New Test Content' + randomstring.generate(7),
    };
    const vars = {
      input: newComment,
      commentId: commentId1,
    };
    await putComment(app, vars, userData2.token!);
  });

  // delete comment
  it('should delete a comment', async () => {
    await deleteComment(app, commentId1, userData2.token!);
  });

  // test delete user based on token
  it('should delete current user', async () => {
    await deleteUser(app, userData.token!);
  });
});
