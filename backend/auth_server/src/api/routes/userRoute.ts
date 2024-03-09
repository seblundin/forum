import express from 'express';
import {
  check,
  checkToken,
  userDelete,
  userGet,
  userListGet,
  userPost,
  userPut,
} from '../controllers/userController';
import {authenticate} from '../../middlewares';

const router = express.Router();

router.route('/').get(userListGet).post(userPost).put(authenticate, userPut);

router.get('/token', authenticate, checkToken);

router.route('/check').get(check);

router.route('/:id').get(userGet).delete(authenticate, userDelete);

export default router;
