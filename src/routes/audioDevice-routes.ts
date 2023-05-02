import express from 'express';
import * as audioController from '../controllers/audioDevice-controller';
import { forceAuthorize } from '../middleware/auth';

const audioRouter = express.Router();

// GET
audioRouter.get('/audio-devices', forceAuthorize, audioController.getDevices);
audioRouter.get(
	'/audio-devices/:id',
	forceAuthorize,
	audioController.getDevice
);

// POST
audioRouter.post('/audio', forceAuthorize, audioController.create);

// PUT
audioRouter.put('/audio/:id', forceAuthorize, audioController.update);

export default audioRouter;
