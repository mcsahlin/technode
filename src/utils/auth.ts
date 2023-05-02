import bcrypt from 'bcrypt';
import jwt, { DecodeOptions, VerifyOptions } from 'jsonwebtoken';

// JWT secret, expiration time and algorithm
const JWT_SECRET = process.env.JWT_SECRET || '10X_OR_GO_HOME';
const JWT_EXPIRATION = '30m'; // 30 minutes
const JWT_ALGORITHM = 'HS256'; // HMAC SHA-256
const saltRounds = 10;

// Interface for JWT payload
export interface IJwtPayload {
	userId: string;
	username: string;
}

// Hash password and return it, async function because it takes time to hash
export const hashPassword = async (password: string) => {
	return await bcrypt.hashSync(password, saltRounds);
};

// Compare password with hash and return true if match or false if not
export const comparePassword = async (password: string, hash: string) => {
	return await bcrypt.compare(password, hash);
};

// Create JWT token and return it
export const getJWT = (payload: IJwtPayload) => {
	const options = { expiresIn: JWT_EXPIRATION };
	return jwt.sign(payload, JWT_SECRET, options);
};

// Verify JWT token and return payload if successful or throw error if not
export const verifyJWT = (token: string) => {
	try {
		const options: VerifyOptions = { algorithms: [JWT_ALGORITHM] }; // Only allow HS256 algorithm
		const decodedToken = jwt.verify(token, JWT_SECRET, options) as IJwtPayload;
		return decodedToken;
	} catch (err) {
		console.error(err);
		throw new Error('Invalid token');
	}
};

// Decode JWT token and return payload
export const decodeJWT = (token: string) => {
	const decoded = jwt.decode(token, JWT_SECRET as DecodeOptions);
	return decoded;
};
