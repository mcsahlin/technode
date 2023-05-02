import express from 'express';
import * as userController from '../controllers/user-controller';
const router = express.Router();

// User registration route
router.post('/signup', userController.signup);

// User login route
router.post('/login', userController.login);

export default router;
