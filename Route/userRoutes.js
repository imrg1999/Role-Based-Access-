import express from 'express';
import { showAllusers, createNewUser, updateUser } from '../Controller/userController.js';

const route = express.Router();

route.get('/users',showAllusers);
route.post('/add',createNewUser);
route.put('/update',updateUser);


export default route;