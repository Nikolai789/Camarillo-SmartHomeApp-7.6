import { Router } from 'express';
import { getDevices, patchDevice } from '../controllers/deviceController';

export const deviceRoutes = Router();
deviceRoutes.get('/', getDevices);
deviceRoutes.patch('/:id', patchDevice);
