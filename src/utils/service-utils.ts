export const API_BASE_URL = 'http://localhost:1337/api/';
export const resolveUrl = (urlEnding: string) => {
	return API_BASE_URL + urlEnding;
};
