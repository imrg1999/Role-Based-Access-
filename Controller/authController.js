import userModel from "../Model/userModel.js";
import { passwordHashing } from "../Utility/passwordHashing.js";
import jwt from 'jsonwebtoken';

export const registerUser = async(req,res) => {
    try{
        const {name, email, contact, age, password, role} = req.body;
        const existingUser = await userModel.findOne({email})
        if(existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists"
            })
        }
         const hashPass = await passwordHashing(password);
        const regNewUser = await userModel.create({
            name, 
            email, 
            contact, 
            age, 
            password: hashPass, 
            role});
        if(!regNewUser) {
             return res.status(404).json({
                success: false,
                message: "No new user created"
            })
        }
        res.status(201).json({
            success: true,
            message: "New User Created Successfully",
            user: regNewUser
        })
    } catch(error) {
        console.error(error.message);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
    })
  }
}