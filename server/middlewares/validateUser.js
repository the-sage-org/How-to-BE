import Helper from '../utilities/helper';
import db from '../models/User';

const userValidator = {
  async verifyUser(req, res, next) {
    const email = req.body.email.trim();
    const username = req.body.username.trim();
    const password = req.body.password.trim();
    const errors = [];
    if (!Helper.isValidEmail(email) || !email) {
      errors.push({ error: 'Please enter a valid email address' });
    }
    if (!Helper.isValidName(username) || !username) {
      errors.push({ error: 'Please enter a valid username' });
    }
    if (!password) {
      errors.push({ error: 'Please enter a valid password' });
    }
    if (password.length < 6) {
      errors.push({ error: 'Please enter a password of at least six characters' });
    }
    if (errors.length >= 1) {
      return res.status(400).send({
        status: 400,
        errors,
      });
    }

    const usernameCheck = await db.checkUsername(username);
    if (usernameCheck === 'duplicate') {
      return res.status(409).send({
        status: 409,
        errors: [{ error: 'Sorry username already exists.' }],
      });
    }

    const receiverEmail = await db.getEmail(email);
    if (receiverEmail) {
      return res.status(409).send({ status: 409, error: 'Email has already been registered' });
    }

    return next();
  },
  async verifyLogin(req, res, next) {
    if (!req.body.password) {
      return res.status(400).send({
        status: 400,
        error: 'Email or password is incorrect',
      });
    }

    if (!req.body.email) {
      return res.status(400).send({
        status: 400,
        error: 'Email or password is incorrect',
      });
    }

    const userEmail = await db.getEmail(req.body.email);

    if (!userEmail) {
      return res.status(400).send({
        status: 400,
        error: 'Email or password is incorrect',
      });
    }
    const user = await db.getUserByEmail(req.body.email);
    if (!Helper.comparePassword(user.password, req.body.password)) {
      return res.status(400).send({
        status: 400,
        error: 'Email or password is incorrect',
      });
    }
    req.user = user;
    return next();
  },
};

export default userValidator;
