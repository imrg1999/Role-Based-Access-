import express from 'express';
import { showAllusers, createNewUser, 
    updateUser, deleteUser, findUserById } from '../Controller/userController.js';

const route = express.Router();

route.get('/users',showAllusers);
route.post('/add',createNewUser);
route.put('/update',updateUser);
route.delete('/delete',deleteUser);
route.get('/user',findUserById);

export default route;