/* eslint-disable node/no-unpublished-import */
import request from 'supertest';
import {Application} from 'express';
import {ThreadTest} from '../src/interfaces/Thread';
require('dotenv').config();

// add test for graphql query
// before testing graphql, upload image to /api/v1/upload, parameter name: cat
// the file is test/picWithGPS.JPG
// the upload route will return JSON object:
/* {
  message: 'cat uploaded',
  data: {
    filename: string,
    location: geoJSON point,
  },
}
mutation CreateCat($cat_name: String!, $weight: Float!, $birthdate: DateTime!, $owner: ID!, $location: LocationInput!, $filename: String!) {
  createCat(cat_name: $cat_name, weight: $weight, birthdate: $birthdate, owner: $owner, location: $location, filename: $filename) {
    id
    cat_name
    weight
    birthdate
    owner {
      username
    }
    location {
      coordinates
      type
    }
    filename
  }
}
*/

//TODO
/*
const postFile = (
  url: string | Application,
  token: string
): Promise<UploadResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/upload')
      .set('Authorization', `Bearer ${token}`)
      .attach('cat', 'test/picWithGPS.JPG')
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const uploadMessageResponse = response.body;
          expect(uploadMessageResponse).toHaveProperty('message');
          expect(uploadMessageResponse).toHaveProperty('data');
          expect(uploadMessageResponse.data).toHaveProperty('filename');
          expect(uploadMessageResponse.data).toHaveProperty('location');
          expect(uploadMessageResponse.data.location).toHaveProperty(
            'coordinates'
          );
          expect(uploadMessageResponse.data.location).toHaveProperty('type');
          resolve(uploadMessageResponse);
        }
      });
  });
}; */

const postThread = (
  url: string | Application,
  vars: {thread: ThreadTest},
  token: string
): Promise<ThreadTest> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `mutation addThread($thread: ThreadInput!) {
          addThread(thread: $thread) {
            id
            title
            content
            uploadtime
            mediacontent
            owner {
              email
              username
              id
            }
            parent
          }
        }`,
        variables: vars,
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const thread = vars.thread;
          const newThread: ThreadTest = response.body.data.addThread;
          expect(newThread).toHaveProperty('id');
          expect(newThread.title).toBe(thread.title);
          expect(newThread.content).toBe(thread.content);
          expect(newThread).toHaveProperty('uploadtime');
          expect(newThread).toHaveProperty('mediacontent');
          expect(newThread.owner).toHaveProperty('username');
          expect(newThread.parent).toBe(null);
          resolve(newThread);
        }
      });
  });
};

const putThread = (
  url: string | Application,
  vars: {thread: ThreadTest; id: string},
  oldThread: ThreadTest,
  token: string
): Promise<ThreadTest> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `mutation updateThread($id: ID!, $thread: ThreadInput!) {
          updateThread(id: $id, thread: $thread) {
            id
            title
            content
            uploadtime
            mediacontent
            owner {
              email
              username
              id
            }
            parent
          }
        }`,
        variables: vars,
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const thread = vars.thread;
          console.error(response.body, 'THREAD', thread);
          const updatedThread = response.body.data.updateThread;
          expect(updatedThread).toHaveProperty('id');
          expect(updatedThread.title).toBe(oldThread.title);
          expect(updatedThread.content).toBe(thread.content);
          expect(updatedThread).toHaveProperty('uploadtime');
          expect(updatedThread).toHaveProperty('mediacontent');
          expect(updatedThread.owner).toHaveProperty('username');
          expect(updatedThread.parent).toBe(null);
          resolve(updatedThread);
        }
      });
  });
};

const deleteThread = (
  url: string | Application,
  id: string,
  token: string
): Promise<ThreadTest> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `mutation deleteThread($id: ID!) {
          deleteThread(id: $id) {
            id
          }
        }`,
        variables: {
          id: id,
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const deletedThread = response.body.data.deleteThread;
          expect(deletedThread.id).toBe(id);
          resolve(deletedThread);
        }
      });
  });
};

const postComment = (
  url: string | Application,
  vars: {thread: ThreadTest},
  token: string
): Promise<ThreadTest> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `mutation addThread($thread: ThreadInput!) {
          addThread(thread: $thread) {
            id
            title
            content
            uploadtime
            mediacontent
            owner {
              email
              username
              id
            }
            parent
          }
        }`,
        variables: vars,
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const comment = vars.thread;
          const newComment: ThreadTest = response.body.data.addThread;
          expect(newComment).toHaveProperty('id');
          expect(newComment.title).toBe(null);
          expect(newComment.content).toBe(comment.content);
          expect(newComment).toHaveProperty('uploadtime');
          expect(newComment).toHaveProperty('mediacontent');
          expect(newComment.owner).toHaveProperty('username');
          expect(newComment).toHaveProperty('parent');
          resolve(newComment);
        }
      });
  });
};

const putComment = (
  url: string | Application,
  vars: {thread: ThreadTest; id: string},
  token: string
): Promise<ThreadTest> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `mutation updateThread($id: ID!, $thread: ThreadInput!) {
          updateThread(id: $id, thread: $thread) {
            id
            title
            content
            uploadtime
            mediacontent
            owner {
              email
              username
              id
            }
            parent
          }
        }`,
        variables: vars,
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const comment = vars.thread;
          const updatedComment = response.body.data.updateThread;
          expect(updatedComment).toHaveProperty('id');
          expect(updatedComment.title).toBe(null);
          expect(updatedComment.content).toBe(comment.content);
          expect(updatedComment).toHaveProperty('uploadtime');
          expect(updatedComment).toHaveProperty('mediacontent');
          expect(updatedComment.owner).toHaveProperty('username');
          expect(updatedComment).toHaveProperty('parent');
          resolve(updatedComment);
        }
      });
  });
};

const deleteComment = (
  url: string | Application,
  id: string,
  token: string
): Promise<ThreadTest> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `mutation deleteThread($id: ID!) {
          deleteThread(id: $id) {
            id
          }
        }`,
        variables: {
          id,
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const deletedComment = response.body.data.deleteThread;
          expect(deletedComment.id).toBe(id);
          resolve(deletedComment);
        }
      });
  });
};

const getThreads = (url: string | Application): Promise<ThreadTest[]> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .send({
        query: `query Query {
          threads {
            id
            title
            content
            uploadtime
            mediacontent
          }
        }`,
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const threads = response.body.data.threads;
          expect(threads).toBeInstanceOf(Array);
          threads.forEach((thread: ThreadTest) => {
            expect(thread).toHaveProperty('id');
            expect(thread).toHaveProperty('title');
            expect(thread).toHaveProperty('content');
            expect(thread).toHaveProperty('uploadtime');
            expect(thread).toHaveProperty('mediacontent');
            expect(thread.parent).toBe(undefined);
          });
          resolve(threads);
        }
      });
  });
};

const getSingleThread = (
  url: string | Application,
  id: string
): Promise<ThreadTest> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .send({
        query: `query threadById($id: ID!) {
          threadById(id: $id) {
            id
            title
            content
            uploadtime
            mediacontent
            owner {
              email
              username
              id
            }
            parent
          }
        }`,
        variables: {
          id: id,
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const thread = response.body.data.threadById;
          expect(thread).toHaveProperty('id');
          expect(thread).toHaveProperty('title');
          expect(thread).toHaveProperty('content');
          expect(thread).toHaveProperty('uploadtime');
          expect(thread).toHaveProperty('mediacontent');
          expect(thread.owner).toHaveProperty('username');
          expect(thread.parent).toBe(null);
          resolve(thread);
        }
      });
  });
};

const getThreadsByOwner = (
  url: string | Application,
  id: string
): Promise<ThreadTest[]> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .send({
        query: `query threadsByOwner($ownerId: ID!) {
          threadsByOwner(ownerId: $ownerId) {
            id
            title
            content
            uploadtime
            mediacontent
            owner {
              email
              username
              id
            }
            parent
          }
        }`,
        variables: {
          ownerId: id,
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const threads = response.body.data.threadsByOwner;
          threads.forEach((thread: ThreadTest) => {
            expect(thread).toHaveProperty('id');
            expect(thread).toHaveProperty('title');
            expect(thread).toHaveProperty('content');
            expect(thread).toHaveProperty('uploadtime');
            expect(thread).toHaveProperty('mediacontent');
            expect(thread.owner).toHaveProperty('username');
            expect(thread.parent).toBe(null);
          });
          resolve(threads);
        }
      });
  });
};

const getCommentsByThread = (
  url: string | Application,
  id: string
): Promise<ThreadTest[]> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .send({
        query: `query commentsByThread($threadId: ID!) {
          commentsByThread(threadId: $threadId) {
            id
            title
            content
            uploadtime
            mediacontent
            owner {
              email
              username
              id
            }
            parent
          }
        }`,
        variables: {
          threadId: id,
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const comments = response.body.data.commentsByThread;
          comments.forEach((comment: ThreadTest) => {
            expect(comment).toHaveProperty('id');
            expect(comment.title).toBe(null);
            expect(comment).toHaveProperty('content');
            expect(comment).toHaveProperty('uploadtime');
            expect(comment).toHaveProperty('mediacontent');
            expect(comment.owner).toHaveProperty('username');
            expect(comment).toHaveProperty('parent');
          });
          resolve(comments);
        }
      });
  });
};

export {
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
};
