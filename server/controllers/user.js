import db from '../models/User';
import Helper from '../utilities/helper';

const User = {
  async create(req, res) {
    const hashPassword = Helper.hashPassword(req.body.password);

    const reqUser = {
      email: req.body.email,
      username: req.body.username,
      password: hashPassword,
    };

    const newUser = await db.create(reqUser);

    const token = Helper.generateToken(newUser.id);
    return res.status(201).send({
      status: 201,
      data: [
        {
          token,
          newUser: {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
          },
          message: 'User sign up was succesfull',
        },
      ],
    });
  },
};

export default User;
