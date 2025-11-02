import express from 'express';
import { showAllusers } from '../Controller/userController.js';

const route = express.Router();

route.get('/',showAllusers);


export default route;