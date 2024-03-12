import {MyContext} from '../../interfaces/MyContext';
import {ThreadInput} from '../../interfaces/Thread';
import threadModel from '../models/threadModel';
import userModel from '../../../auth_server/src/api/models/userModel';
import fetchData from '../../functions/fetchData';
import {User} from '../../interfaces/User';

export default {
  Query: {
    threads: async () => {
      try {
        return await threadModel.find();
      } catch (error) {
        console.log(error);
      }
    },
    threadById: async (_parent: undefined, args: {id: string}) => {
      try {
        return await threadModel.findById(args.id);
      } catch (error) {
        console.log(error);
      }
    },
    threadsByOwner: async (_parent: undefined, args: {ownerId: string}) => {
      try {
        return await threadModel.find({owner: args.ownerId});
      } catch (error) {
        console.log(error);
      }
    },
    commentsByThread: async (_parent: undefined, args: {threadId: string}) => {
      try {
        return await threadModel.find({parent: args.threadId});
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    addThread: async (
      _parent: undefined,
      args: {thread: ThreadInput},
      context: MyContext
    ) => {
      try {
        return await threadModel.create({
          ...args.thread,
          owner: context.userdata?.user.id,
        });
      } catch (error) {
        console.log(error);
      }
    },
    updateThread: async (
      _parent: undefined,
      args: {id: string; thread: ThreadInput},
      context: MyContext
    ) => {
      try {
        const thread = await threadModel.findById(args.id);
        if (!thread) {
          throw new Error('Thread not found');
        }
        if (String(thread!.owner) === context.userdata?.user.id) {
          const updatedThread = await threadModel.findByIdAndUpdate(
            args.id,
            args.thread,
            {
              returnDocument: 'after',
            }
          );
          return updatedThread;
        } else {
          throw new Error('Not the thread owner');
        }
      } catch (error) {
        console.log(error);
      }
    },
    deleteThread: async (
      _parent: undefined,
      args: {id: string},
      context: MyContext
    ) => {
      try {
        const thread = await threadModel.findById(args.id);
        if (!thread) {
          throw new Error('Thread not found');
        }
        if (String(thread!.owner) === context.userdata?.user.id) {
          const ripThread = await threadModel.findByIdAndDelete(args.id);
          return ripThread;
        } else {
          throw new Error('Not the thread owner');
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
