import { Container } from 'typedi';
import mongoose from 'mongoose';
import { Logger } from 'winston';
import { IUserDTO } from '../../dto/User/IUserDTO';

/**
 * Attach user to req.currentUser
 * @param {*} req Express req Object
 * @param {*} res  Express res Object
 * @param {*} next  Express next Function
 */
const attachCurrentUser = async (req, res, next) => {
  const Logger : Logger = Container.get('logger');
  try {
    const UserModel = Container.get('userModel') as mongoose.Model<IUserDTO & mongoose.Document>;
    const userRecord = await UserModel.findById(req.token._id);
    if (!userRecord) {
      return res.sendStatus(401);
    }
    const currentUser = userRecord.toObject();
    Reflect.deleteProperty(currentUser, 'password');
    Reflect.deleteProperty(currentUser, 'salt');
    req.currentUser = currentUser;
    return next();
  } catch (e) {
    Logger.error('🔥 Error attaching user to req: %o', e);
    return next(e);
  }
};

export default attachCurrentUser;
