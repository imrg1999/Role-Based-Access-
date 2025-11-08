import express from 'express';
import { authMiddleware } from '../Middleware/authMiddleware.js';
import { roleMiddleware } from '../Middleware/roleMiddleware.js';
import { adminAccess, managerAccess, userAccess } from '../Controller/authController.js';

const route = express.Router();

route.post('/profile',authMiddleware,roleMiddleware(["user","admin","manager"]), userAccess);
route.post('/admin',authMiddleware,roleMiddleware(["admin"]), adminAccess);
route.post('/manager',authMiddleware,roleMiddleware(["admin","manager"]), managerAccess); 

export default route;