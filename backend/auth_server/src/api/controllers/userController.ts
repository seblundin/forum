import {hash} from 'bcryptjs';
import CustomError from '../../classes/CustomError';
import {User} from '../../interfaces/User';
import UserModel from '../models/userModel';
import {Request, Response, NextFunction} from 'express';
import MessageResponse from '../../interfaces/MessageResponse';

export const check = (_: Request, res: Response) => {
  return res.status(200).end();
};

export const checkToken = async (
  _: Request,
  res: Response<MessageResponse & {id: number}>,
  next: NextFunction
) => {
  if (!res.locals.user) {
    next(new CustomError('token not valid', 403));
  }
  res.json(res.locals.user);
};

export const userDelete = async (
  req: Request<{id: string}>,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.query.id) {
      next(new CustomError('Bad request, user id missing', 400));
    }
    const result = await UserModel.findOneAndDelete({_id: req.query.id}).exec();
    console.error(result);
    result
      ? res.json({message: 'User deleted', user: result})
      : new CustomError('Not found', 404);
  } catch (error) {
    next(error);
  }
};

export const userGet = async (
  req: Request<{id: string}>,
  res: Response<User>,
  next: NextFunction
) => {
  try {
    const user = await UserModel.findById(req.params.id).exec();
    user ? res.json(user) : new CustomError('Not found', 404);
  } catch (error) {
    next(error);
  }
};

export const userListGet = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await UserModel.find().exec();
    return res.json(users);
  } catch (e) {
    next(e);
  }
};

export const userPost = async (
  req: Request<Omit<User, 'user_id'>>,
  res: Response<MessageResponse & {user: User}>,
  next: NextFunction
) => {
  try {
    if (req.body.password.length < 5) {
      next(new CustomError('Invalid password length', 400));
    }
    const password = await hash(req.body.password, 12);

    const user = await (await UserModel.create({...req.body, password})).save();
    user
      ? res.json({message: 'User added', user})
      : next(new CustomError('Bad request', 400));
    return;
  } catch (error) {
    next(error);
  }
};

interface UpdateRequest extends Request {
  body: Omit<User, 'user_id'>;
  params: {id: string};
}

export const userPut = async (
  req: UpdateRequest,
  res: Response<MessageResponse & {user: User}>,
  next: NextFunction
) => {
  try {
    const user = req.body;
    if (!user) {
      next(new CustomError('User data missing', 500));
    }

    const result = await UserModel.findByIdAndUpdate(res.locals.user.id, user, {
      returnDocument: 'after',
    }).exec();
    result
      ? res.json({message: 'User updated', user: result})
      : new CustomError('Error', 500);
  } catch (error) {
    next(error);
  }
};
