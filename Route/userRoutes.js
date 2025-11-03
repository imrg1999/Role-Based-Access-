import express from 'express';
import { showAllusers, createNewUser } from '../Controller/userController.js';

const route = express.Router();

route.get('/users',showAllusers);
route.post('/add',createNewUser);


export default route;