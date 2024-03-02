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

export default mongoose.model<Thread>('Thread', threadSchema);
