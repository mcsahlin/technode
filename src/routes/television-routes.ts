import express from 'express';
import { forceAuthorize } from '../middleware/auth';
import * as televisionController from '../controllers/television-controller';

const televisionRouter = express.Router();

televisionRouter.get(
	'/televisions',
	forceAuthorize,
	televisionController.getDevices
);

televisionRouter.get(
	'/televisions/:id',
	forceAuthorize,
	televisionController.getDevice
);

// POST

televisionRouter.post(
	'/televisions',
	forceAuthorize,
	televisionController.create
);

// PUT
televisionRouter.put(
	'/televisions/:id',
	forceAuthorize,
	televisionController.update
);

export default televisionRouter;
