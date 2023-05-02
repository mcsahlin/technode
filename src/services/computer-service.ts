import axios from 'axios';
import { resolveUrl } from '../utils/service-utils';

const ENDPOINT = resolveUrl('computers');

// GET all devices
export const getDevices = async () => {
	try {
		const response = await axios.get(ENDPOINT);
		return response.data;
	} catch (err: any) {
		throw new Error(err.statusText);
	}
};

// GET computer by ID
export const getDevice = async (id: string) => {
	const response = await axios.get(`${ENDPOINT}/${id}`);
	return response.data;
};

// POST or PUT computer
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
	processor: string
) => {
	const computer = {
		name,
		description,
		manufacturer,
		price,
		processor,
	};

	return createOrUpdateDevice('POST', undefined, computer);
};

// PUT computer
export const updateDevice = async (
	id: string,
	name: string,
	description: string,
	manufacturer: string,
	price: number,
	processor: string
) => {
	const computer = {
		name,
		description,
		manufacturer,
		price,
		processor,
	};

	return createOrUpdateDevice('PUT', id, computer);
};
