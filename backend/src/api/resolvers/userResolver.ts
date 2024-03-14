import {GraphQLError} from 'graphql';
import {User, UserInput} from '../../interfaces/User';
import fetchData from '../../functions/fetchData';
import UserResponse from '../../interfaces/UserResponse';
import {LoginResponse} from '../../interfaces/MessageInterfaces';
import {MyContext} from '../../interfaces/MyContext';
import {Thread, ThreadInput} from '../../interfaces/Thread';
import threadResolver from './threadResolver';

export default {
  Thread: {
    owner: async (parent: Thread) => {
      return await fetchData<User>(
        `${process.env.AUTH_URL}/users/${parent.owner.toString()}`
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
    checkToken: async (_parent: undefined, _: {}, context: MyContext) => {
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
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(args.credentials),
        }
      );
    },
    register: async (_parent: undefined, args: {user: UserInput}) => {
      return await fetchData<UserResponse>(`${process.env.AUTH_URL}/users`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
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
          'Content-Type': 'application/json',
          Authorization: `Bearer ${context.userdata?.token}`,
        },
        body: JSON.stringify(args.user),
      });
    },
    deleteUser: async (_parent: undefined, _: {}, context: MyContext) => {
      /*const result = await fetchData<UserResponse>(
        `${process.env.AUTH_URL}/users/${context.userdata?.user.id}`,
        {
          method: 'DELETE',
          headers: {Authorization: `Bearer ${context.userdata?.token}`},
        }
      );*/

      const deletedUser: UserInput = {
        username: 'DELETED',
        email: 'DELETED',
        password: '',
      };
      const result = await fetchData<UserResponse>(
        `${process.env.AUTH_URL}/users`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${context.userdata?.token}`,
          },
          body: JSON.stringify(deletedUser),
        }
      );

      const threadData: ThreadInput = {
        title: 'DELETED',
        content: 'DELETED',
        uploadtime: new Date(),
      };
      const commentData: ThreadInput = {
        content: 'DELETED',
        uploadtime: new Date(),
      };

      const threads = await threadResolver.Query.threadsByOwner(undefined, {
        ownerId: context.userdata!.user.id,
      });
      threads?.forEach(async (thread) => {
        if (thread.parent === undefined) {
          await threadResolver.Mutation.updateThread(
            undefined,
            {id: thread.id, thread: threadData},
            context
          );
        } else {
          await threadResolver.Mutation.updateThread(
            undefined,
            {id: thread.id, thread: commentData},
            context
          );
        }
      });
      return result;
    },
  },
};
