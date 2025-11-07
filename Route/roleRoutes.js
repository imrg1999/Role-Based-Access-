import express from 'express';
import { authMiddleware } from '../Middleware/authMiddleware.js';
import { adminAccess } from '../Controller/authController.js';

const route = express.Router();

route.get('/admin',authMiddleware,adminAccess); 

export default route;