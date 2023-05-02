import express from 'express';
import audioRouter from './routes/audioDevice-routes';
import computerRouter from './routes/computer-routes';
import mobileRouter from './routes/mobile-routes';
import televisionRouter from './routes/television-routes';
import userRoute from './routes/user-routes';
import { userAuthorization } from './middleware/auth';
import cors from 'cors';
const PORT = process.env.PORT || 3000;
const app = express();
app.use(
	cors({
		origin: '*',
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		// allowedHeaders: ['Content-Type', 'Authorization'],
	})
);
app.use(userAuthorization);
app.use(express.json());
app.use(userRoute, audioRouter, mobileRouter, computerRouter, televisionRouter);
app.listen(PORT, () => {
	console.log(`Server listening to localhost at port ${PORT}`);
});
