import express from 'express';
import { forceAuthorize } from '../middleware/auth';
import * as computerController from '../controllers/computer-controller';
const computerRouter = express.Router();

// GET
computerRouter.get('/computers', forceAuthorize, computerController.getDevices);
computerRouter.get(
	'/computers/:id',
	forceAuthorize,
	computerController.getDevice
);

// POST
computerRouter.post('/computers', forceAuthorize, computerController.create);

// PUT
computerRouter.put('/computers/:id', forceAuthorize, computerController.update);

export default computerRouter;
