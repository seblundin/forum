import mongoose from 'mongoose';
import {Thread} from '../../interfaces/Thread';

const threadSchema = new mongoose.Schema<Thread>({
  title: {
    type: String,
    required: false,
  },
  content: {
    type: String,
    required: true,
  },
  uploadtime: {
    type: Date,
    required: true,
  },
  mediacontent: {
    type: String,
    required: false,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Thread',
    required: false,
  },
});

threadSchema.method('toJSON', function () {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {__v, _id, ...object} = this.toObject();
  object.id = _id.toHexString();
  return object;
});

export default mongoose.model<Thread>('Thread', threadSchema);
