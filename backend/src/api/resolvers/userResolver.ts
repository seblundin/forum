import {GraphQLError} from 'graphql';
import {TokenContent, User, UserInput, UserOutput} from '../../interfaces/User';
import fetchData from '../../functions/fetchData';
import UserResponse from '../../interfaces/UserResponse';
import LoginResponse from '../../interfaces/LoginMessageResponse';
import {MyContext} from '../../interfaces/MyContext';
import {Thread} from '../../interfaces/Thread';

export default {
  Thread: {
    owner: async (parent: Thread) => {
      return await fetchData<User>(
        `${process.env.AUTH_URL}/users/${parent.owner}`
      );
    },
  },
  Query: {
    users: async () => {
      return await fetchData<User[]>(`${process.env.AUTH_URL}/users`);
    },
    userById: async (_parent: undefined, args: {id: string}) => {
      return await fetchData<User[]>(
        `${process.env.AUTH_URL}/users/${args.id}`
      );
    },
    checkToken: async (_parent: undefined, args: {}, context: MyContext) => {
      if (!context.userdata?.user) {
        throw new GraphQLError('Invalid token');
      }
      return context.userdata.user;
    },
  },
  Mutation: {
    login: async (
      _parent: undefined,
      args: {credentials: {username: string; password: string}}
    ) => {
      return await fetchData<LoginResponse>(
        `${process.env.AUTH_URL}/auth/login`,
        {
          method: 'POST',
          headers: {'Content-Type': 'application.json'},
          body: JSON.stringify(args.credentials),
        }
      );
    },
    register: async (_parent: undefined, args: {user: UserInput}) => {
      return await fetchData<UserResponse>(`${process.env.AUTH_URL}/users`, {
        method: 'POST',
        headers: {'Content-Type': 'application.json'},
        body: JSON.stringify(args.user),
      });
    },
    updateUser: async (
      _parent: undefined,
      args: {user: {username: string; email: string; password: string}},
      context: MyContext
    ) => {
      return await fetchData<UserResponse>(`${process.env.AUTH_URL}/users`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application.json',
          Authorization: `Bearer ${context.userdata?.token}`,
        },
        body: JSON.stringify(args.user),
      });
    },
    deleteUser: async (_parent: undefined, args: {}, context: MyContext) => {
      return await fetchData<UserResponse>(
        `${process.env.AUTH_URL}/users/${context.userdata?.user.id}`,
        {
          method: 'DELETE',
          headers: {Authorization: `Bearer ${context.userdata?.token}`},
        }
      );
    },
  },
};
