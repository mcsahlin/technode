import axios from 'axios';
import { resolveUrl } from '../utils/service-utils';

const ENDPOINT = resolveUrl('audio-devices');

// GET devices
export const getDevices = async () => {
	try {
		const response = await axios.get(ENDPOINT);
		return response.data;
	} catch (err: any) {
		throw new Error(err.statusText);
	}
};

// GET device by ID
export const getDevice = async (id: string) => {
	const response = await axios.get(`${ENDPOINT}/${id}`);
	return response.data;
};

// POST or PUT device
const createOrUpdateDevice = async (
	method: string,
	id: string | undefined,
	data: any
) => {
	const url = id ? `${ENDPOINT}/${id}` : ENDPOINT;

	try {
		// try to create or update
		const response = await axios({
			method,
			url,
			data,
		});

		return response.data;
	} catch (err: any) {
		// if error, throw error message from server
		throw new Error(err.statusText);
	}
};

// POST device
export const newDevice = async (
	name: string,
	description: string,
	manufacturer: string,
	price: number,
	output: number
) => {
	const device = {
		name,
		description,
		manufacturer,
		price,
		output,
	};

	return createOrUpdateDevice('POST', undefined, device);
};

// PUT device
export const updateDevice = async (
	id: string,
	name: string,
	description: string,
	manufacturer: string,
	price: number,
	output: number
) => {
	const device = {
		name,
		description,
		manufacturer,
		price,
		output,
	};

	return createOrUpdateDevice('PUT', id, device);
};
