import { Request, Response, NextFunction } from 'express';
import * as auth from '../utils/auth';

// Add user property to Request interface
declare module 'express-serve-static-core' {
	export interface Request {
		user: any;
	}
}

// Middleware to check if user is logged in
export const userAuthorization = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const token = req.headers.authorization;
	try {
		if (token && auth.verifyJWT(token)) {
			const tokenData = auth.decodeJWT(token);
			req.user = tokenData;
			req.user.isLoggedIn = true;
			console.log('User logged in');
		} else {
			req.user = { isLoggedIn: false };
			console.log('User not logged in, or invalid token');
		}
	} catch (err: any) {
		console.error(err.statusText);
		req.user = { isLoggedIn: false };
		console.log('User not logged in, or invalid token');
	}
	next();
};

// Middleware to force user to be logged in
export const forceAuthorize = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (req.user.isLoggedIn) {
		console.log('User logged in');
		next();
	} else {
		res.sendStatus(401);
		console.log('User not logged in');
	}
};
