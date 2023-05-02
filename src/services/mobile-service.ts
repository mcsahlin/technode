import axios from 'axios';
import { resolveUrl } from '../utils/service-utils';

const ENDPOINT = resolveUrl('mobiles');

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
		const response = await axios({
			method,
			url,
			data,
		});
		return response.data;
	} catch (err: any) {
		throw new Error(err.statusText);
	}
};

// POST computer
export const newDevice = async (
	name: string,
	description: string,
	manufacturer: string,
	price: number,
	display: string
) => {
	const device = {
		name,
		description,
		manufacturer,
		price,
		display,
	};

	return createOrUpdateDevice('POST', undefined, device);
};

// PUT computer
export const updateDevice = async (
	id: string,
	name: string,
	description: string,
	manufacturer: string,
	price: number,
	display: string
) => {
	const device = {
		name,
		description,
		manufacturer,
		price,
		display,
	};

	return createOrUpdateDevice('PUT', id, device);
};
