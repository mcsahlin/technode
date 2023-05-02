import db from '../db';

// Create account
export const register = (
	username: string,
	hashedPassword: string,
	callback: any
) => {
	const query = `
        INSERT INTO accounts (username, hashedPassword)
        VALUES (?, ?)
    `;
	const values = [username, hashedPassword];
	db.run(query, values, callback);
};

// Get account by username
export const getUserByUsername = (username: string, callback: any) => {
	const query = `
        SELECT * FROM accounts WHERE username = ?
    `;
	db.get(query, username, callback);
};
