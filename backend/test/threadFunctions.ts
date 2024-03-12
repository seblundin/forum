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
      user_name
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
            title
            content
            uploadtime
            mediacontent
            owner {
              email
              user_name
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
          expect(newThread.owner).toHaveProperty('user_name');
          expect(newThread.parent).toBe(undefined);
          resolve(newThread);
        }
      });
  });
};

const putThread = (
  url: string | Application,
  vars: {input: ThreadTest; threadId: string},
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
            title
            content
            uploadtime
            mediacontent
            owner {
              email
              user_name
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
          const thread = vars.input;
          const updatedThread = response.body.data.updateThread;
          expect(updatedThread).toHaveProperty('id');
          expect(updatedThread.title).toBe(thread.title);
          expect(updatedThread.content).toBe(thread.content);
          expect(updatedThread).toHaveProperty('uploadtime');
          expect(updatedThread).toHaveProperty('mediacontent');
          expect(updatedThread.owner).toHaveProperty('user_name');
          expect(updatedThread.parent).toBe(undefined);
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
  vars: {comment: ThreadTest},
  token: string
): Promise<ThreadTest> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `mutation addComment($comment: CommentInput!) {
          addComment(comment: $comment) {
            title
            content
            uploadtime
            mediacontent
            owner {
              email
              user_name
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
          const comment = vars.comment;
          const newComment: ThreadTest = response.body.data.addComment;
          expect(newComment).toHaveProperty('id');
          expect(newComment.title).toBe(undefined);
          expect(newComment.content).toBe(comment.content);
          expect(newComment).toHaveProperty('uploadtime');
          expect(newComment).toHaveProperty('mediacontent');
          expect(newComment.owner).toHaveProperty('user_name');
          expect(newComment).toHaveProperty('parent');
          resolve(newComment);
        }
      });
  });
};

const putComment = (
  url: string | Application,
  vars: {input: ThreadTest; commentId: string},
  token: string
): Promise<ThreadTest> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `mutation updateComment($id: ID!, $comment: CommentInput!) {
          updateComment(id: $id, comment: $comment) {
            title
            content
            uploadtime
            mediacontent
            owner {
              email
              user_name
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
          const comment = vars.input;
          const updatedComment = response.body.data.updateComment;
          expect(updatedComment).toHaveProperty('id');
          expect(updatedComment.title).toBe(undefined);
          expect(updatedComment.content).toBe(comment.content);
          expect(updatedComment).toHaveProperty('uploadtime');
          expect(updatedComment).toHaveProperty('mediacontent');
          expect(updatedComment.owner).toHaveProperty('user_name');
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
        query: `mutation deleteComment($id: ID!) {
          deleteComment(id: $id) {
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
          const deletedComment = response.body.data.deleteComment;
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
            title
            content
            uploadtime
            mediacontent
            owner {
              email
              user_name
              id
            }
            parent
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
            expect(thread.owner).toHaveProperty('user_name');
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
            title
            content
            uploadtime
            mediacontent
            owner {
              email
              user_name
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
          expect(thread.owner).toHaveProperty('user_name');
          expect(thread.parent).toBe(undefined);
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
        query: `query threadByOwner($ownerId: ID!) {
          threadByOwner(ownerId: $ownerId) {
            title
            content
            uploadtime
            mediacontent
            owner {
              email
              user_name
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
          const threads = response.body.data.threadByOwner;
          threads.forEach((thread: ThreadTest) => {
            expect(thread).toHaveProperty('id');
            expect(thread).toHaveProperty('title');
            expect(thread).toHaveProperty('content');
            expect(thread).toHaveProperty('uploadtime');
            expect(thread).toHaveProperty('mediacontent');
            expect(thread.owner).toHaveProperty('user_name');
            expect(thread.parent).toBe(undefined);
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
            title
            content
            uploadtime
            mediacontent
            owner {
              email
              user_name
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
            expect(comment.owner).toHaveProperty('user_name');
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
