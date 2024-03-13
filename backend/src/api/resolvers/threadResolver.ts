import {MyContext} from '../../interfaces/MyContext';
import {Thread, ThreadInput} from '../../interfaces/Thread';
import threadModel from '../models/threadModel';

export default {
  Query: {
    threads: async () => {
      try {
        return await threadModel.find({parent: null});
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
        const findThreadsWithChildren = async (threadId: string) => {
          // Find direct children of the given threadId
          const children = await threadModel.find({parent: threadId});

          // If no children found, return an empty array
          if (children.length === 0) {
            return [];
          }

          const threadsLinkedToParent: Thread[] = [];

          // Iterate through each child and recursively find their children
          for (let i = 0; i < children.length; i++) {
            const child = children[i];
            const grandchildren = await findThreadsWithChildren(child._id);

            // Add current child and its grandchildren to the result array
            threadsLinkedToParent.push(child, ...grandchildren);
          }

          return threadsLinkedToParent;
        };
        return await findThreadsWithChildren(args.threadId);
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
