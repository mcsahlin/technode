import { Request, Response } from 'express';
import * as crypt from '../utils/auth';
import * as service from '../services/user-service';

export const signup = async (req: Request, res: Response) => {
	const { username, password } = req.body;
	const hashedPassword = crypt.hashPassword(password);

	service.register(username, await hashedPassword, (error: Error) => {
		if (error) {
			console.log(error);
			res.status(500).send(error);
		} else {
			res.sendStatus(200);
		}
	});
};

export const login = async (req: Request, res: Response) => {
	const { username, password } = req.body;
	service.getUserByUsername(
		username,
		async (err: Error | null, account: any) => {
			if (err) {
				res.status(500).send(err);
			} else if (account) {
				const correctPassword = crypt.comparePassword(
					password,
					account.hashedPassword
				);

				if (await correctPassword) {
					const jwtToken = crypt.getJWT(account);
					res.send(jwtToken);
				} else {
					console.log('Incorrect password');
					res.sendStatus(404);
				}
			} else {
				console.log('Account not found');
				res.sendStatus(404);
			}
		}
	);
};
