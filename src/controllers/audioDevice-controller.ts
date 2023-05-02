import { Request, Response } from 'express';
import * as service from '../services/audioDevice-service';

// Fetch all devices
export const getDevices = async (req: Request, res: Response) => {
	try {
		const devices = await service.getDevices();
		res.send(devices);
	} catch (err: any) {
		res.sendStatus(500);
		console.log(err.message);
	} // 500 = Internal Server Error
};

// Fetch particular device by id
export const getDevice = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const device = await service.getDevice(id);
		res.send(device);
	} catch (err: any) {
		res.sendStatus(500);
		console.log(err.message);
	}
};

// Post a new device
export const create = async (req: Request, res: Response) => {
	try {
		const { name, description, manufacturer, price, display } = req.body;
		const response = await service.newDevice(
			name,
			description,
			manufacturer,
			price,
			display
		);
		res.send(response);
	} catch (err: any) {
		res.sendStatus(500);
		console.log(err.message);
	}
};

// Update a device
export const update = async (req: Request, res: Response) => {
	try {
		const { name, description, manufacturer, price, display } = req.body;
		const id = req.params.id;
		const response = await service.updateDevice(
			id,
			name,
			description,
			manufacturer,
			price,
			display
		);
		res.send(response);
	} catch (err: any) {
		res.sendStatus(500);
		console.log(err.message);
	}
};
