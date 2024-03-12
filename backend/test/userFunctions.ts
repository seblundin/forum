/* eslint-disable node/no-unpublished-import */
import request from 'supertest';
import randomstring from 'randomstring';
import {UserTest} from '../src/interfaces/User';
import {Application} from 'express';
import {LoginResponse} from '../src/interfaces/MessageInterfaces';
import UserResponse from '../src/interfaces/UserResponse';

// get user from graphql query users
const getUser = (url: string | Application): Promise<UserTest[]> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .send({
        query: '{users{id username email}}',
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const users = response.body.data.users;
          expect(users).toBeInstanceOf(Array);
          expect(users[0]).toHaveProperty('id');
          expect(users[0]).toHaveProperty('username');
          expect(users[0]).toHaveProperty('username');
          expect(users[0]).toHaveProperty('email');
          resolve(response.body.data.users);
        }
      });
  });
};

/* test for graphql query
query UserById($userByIdId: ID!) {
  userById(id: $userByIdId) {
    username
    username
    id
    email
  }
}
*/
const getSingleUser = (
  url: string | Application,
  id: string
): Promise<UserTest> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .send({
        query: `query UserById($userByIdId: ID!) {
          userById(id: $userByIdId) {
            username
            username
            id
            email
          }
        }`,
        variables: {
          userByIdId: id,
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const user = response.body.data.userById;
          expect(user.id).toBe(id);
          expect(user).toHaveProperty('username');
          expect(user).toHaveProperty('username');
          expect(user).toHaveProperty('email');
          resolve(response.body.data.userById);
        }
      });
  });
};

/* test for graphql query
mutation Mutation($user: UserInput!) {
  register(user: $user) {
    message
    user {
      id
      username
      email
    }
  }
}
*/
const postUser = (
  url: string | Application,
  user: UserTest
): Promise<UserTest> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .send({
        query: `mutation Mutation($user: UserInput!) {
          register(user: $user) {
            message
            user {
              id
              username
              username
              email
            }
          }
        }`,
        variables: {
          user: {
            username: user.username,
            email: user.email,
            password: user.password,
          },
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const userData = response.body.data.register;
          expect(userData).toHaveProperty('message');
          expect(userData).toHaveProperty('user');
          expect(userData.user).toHaveProperty('id');
          expect(userData.user.username).toBe(user.username);
          expect(userData.user.username).toBe(user.username);
          expect(userData.user.email).toBe(user.email);
          resolve(response.body.data.register);
        }
      });
  });
};

/* test for graphql query
mutation Login($credentials: Credentials!) {
  login(credentials: $credentials) {
    message
    token
    user {
      email
      id
      username
    }
  }
}
*/

const loginUser = (
  url: string | Application,
  vars: {credentials: {username: string; password: string}}
): Promise<LoginResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .send({
        query: `mutation Login($credentials: Credentials!) {
          login(credentials: $credentials) {
            token
            message
            user {
              email
              username
              username
              id
            }
          }
        }`,
        variables: vars,
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const user = vars.credentials;
          const userData = response.body.data.login;
          expect(userData).toHaveProperty('message');
          expect(userData).toHaveProperty('token');
          expect(userData).toHaveProperty('user');
          expect(userData.user).toHaveProperty('id');
          expect(userData.user.email).toBe(user.username);
          resolve(response.body.data.login);
        }
      });
  });
};

/* test for graphql query
mutation UpdateUser($user: UserModify!) {
  updateUser(user: $user) {
    token
    message
    user {
      id
      username
      email
    }
  }
}
*/
const putUser = (url: string | Application, token: string) => {
  return new Promise((resolve, reject) => {
    const newValue = 'Test Loser ' + randomstring.generate(7);
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer ' + token)
      .send({
        query: `mutation UpdateUser($user: UserModify!) {
          updateUser(user: $user) {
            message
            user {
              id
              username
              email
            }
          }
        }`,
        variables: {
          user: {
            username: newValue,
          },
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const userData = response.body.data.updateUser;
          expect(userData).toHaveProperty('message');
          expect(userData).toHaveProperty('user');
          expect(userData.user).toHaveProperty('id');
          expect(userData.user.username).toBe(newValue);
          resolve(response.body.data.updateUser);
        }
      });
  });
};

/* test for graphql query
mutation DeleteUser {
  deleteUser {
    message
    user {
      id
      username
      email
    }
  }
}
*/

const deleteUser = (
  url: string | Application,
  token: string
): Promise<UserResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Authorization', 'Bearer ' + token)
      .send({
        query: `mutation DeleteUser {
          deleteUser {
            message
            user {
              id
              username
              email
            }
          }
        }`,
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const userData = response.body.data.deleteUser;
          expect(userData).toHaveProperty('message');
          expect(userData).toHaveProperty('user');
          resolve(userData);
        }
      });
  });
};

export {getUser, getSingleUser, postUser, loginUser, putUser, deleteUser};
