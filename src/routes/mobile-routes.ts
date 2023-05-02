import express from 'express';
import { forceAuthorize } from '../middleware/auth';
import * as mobileController from '../controllers/mobile-controller';
const mobileRouter = express.Router();

// GET
mobileRouter.get('/mobiles', forceAuthorize, mobileController.getDevices);
mobileRouter.get('/mobiles/:id', forceAuthorize, mobileController.getDevice);

// POST
mobileRouter.post('/mobiles', forceAuthorize, mobileController.create);

// PUT
mobileRouter.put('/mobiles/:id', forceAuthorize, mobileController.update);

export default mobileRouter;
