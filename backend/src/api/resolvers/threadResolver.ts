import {MyContext} from '../../interfaces/MyContext';
import {CommentInput, ThreadInput} from '../../interfaces/Thread';
import threadModel from '../models/threadModel';

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
        const threads = await threadModel.find({id: args.id});
        return threads;
      } catch (error) {
        console.log(error);
      }
    },
    threadByOwner: async (_parent: undefined, args: {ownerId: string}) => {
      try {
        const threads = await threadModel.find({owner: args.ownerId});
        return threads;
      } catch (error) {
        console.log(error);
      }
    },
    commentsByThread: async (_parent: undefined, args: {threadId: string}) => {
      try {
        const comments = await threadModel.find({parent: args.threadId});
        return comments;
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
          owner: context.userdata?.user,
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
        if (String(thread!.owner.id) === context.userdata?.user.id) {
          const updatedThread = await threadModel
            .findByIdAndUpdate(args.id, args.thread, {
              returnDocument: 'after',
            })
            .populate('owner');
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
        if (String(thread!.owner.id) === context.userdata?.user.id) {
          const ripThread = await threadModel.findByIdAndDelete(args.id);
          return ripThread;
        } else {
          throw new Error('Not the thread owner');
        }
      } catch (error) {
        console.log(error);
      }
    },
    addComment: async (
      _parent: undefined,
      args: {comment: CommentInput},
      context: MyContext
    ) => {
      try {
        return await threadModel.create({
          ...args.comment,
          owner: context.userdata?.user,
        });
      } catch (error) {
        console.log(error);
      }
    },
    updateComment: async (
      _parent: undefined,
      args: {id: string; comment: ThreadInput},
      context: MyContext
    ) => {
      try {
        const comment = await threadModel.findById(args.id);
        if (!comment) {
          throw new Error('Comment not found');
        }
        if (String(comment!.owner.id) === context.userdata?.user.id) {
          const updatedComment = await threadModel
            .findByIdAndUpdate(args.id, args.comment, {
              returnDocument: 'after',
            })
            .populate('owner');
          return updatedComment;
        } else {
          throw new Error('Not the comment owner');
        }
      } catch (error) {
        console.log(error);
      }
    },
    deleteComment: async (
      _parent: undefined,
      args: {id: string},
      context: MyContext
    ) => {
      try {
        const comment = await threadModel.findById(args.id);
        if (!comment) {
          throw new Error('Thread not found');
        }
        if (String(comment!.owner.id) === context.userdata?.user.id) {
          const ripComment = await threadModel.findByIdAndDelete(args.id);
          return ripComment;
        } else {
          throw new Error('Not the comment owner');
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
