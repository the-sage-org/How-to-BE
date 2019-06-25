import express from 'express';
import user from '../controllers/user';
import userValidator from '../middlewares/validateUser';
import Auth from '../middlewares/auth';
import ValidateGuide from '../middlewares/validateGuide';
import guide from '../controllers/guide';

const router = express.Router();

router.post('/auth/signup', userValidator.verifyUser, user.create);
router.post('/auth/login', userValidator.verifyLogin, user.login);
router.post('/guide', Auth.verifyToken, ValidateGuide.createGuide, guide.create);
router.get('/guide', Auth.verifyToken, guide.getGuides);
router.get('/guide/:id', Auth.verifyToken, ValidateGuide.validGuideId, guide.getSpecificGuide);
router.patch('/guide/:id', Auth.verifyToken, ValidateGuide.validGuideId, guide.update);
router.delete('/guide/:id', Auth.verifyToken, ValidateGuide.validGuideId, guide.deleteGroup);

export default router;
