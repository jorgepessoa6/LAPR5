import { Router } from 'express';
import auth from './routes/auth';
import node from './routes/node';
import path from './routes/path';
import userRoute from './routes/userRoute';
import driver from './routes/driver';
import vehicleType from './routes/vehicleType';
import line from './routes/line';
import fileImport from './routes/fileImport';
import tripResult from './routes/tripResult';

// guaranteed to get dependencies
export default () => {
	const app = Router();
	auth(app);
	userRoute(app);
	node(app);
	path(app);
	driver(app);
	vehicleType(app);
	line(app);
	fileImport(app);
	tripResult(app);
	
	return app
}