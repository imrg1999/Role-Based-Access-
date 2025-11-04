import userModel from "../Model/userModel.js";
import { passwordHashing } from "../Utility/passwordHashing.js";


export const showAllusers = async(req,res) => {
    try{
        const allUsers = await userModel.find();
        if(!allUsers || allUsers.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No Users Listed",
                users: []
            })
        }
        res.status(200).json({
            success: true,
            message: "List of users",
            users: allUsers
        })
    }catch(error) {
        console.error(error.message);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const createNewUser = async(req,res) => {
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
        const newUser = await userModel.create({
            name, 
            email, 
            contact, 
            age, 
            password: hashPass, 
            role});
        if(!newUser) {
             return res.status(404).json({
                success: false,
                message: "No new user created"
            })
        }
        res.status(201).json({
            success: true,
            message: "New User Created Successfully",
            user: newUser
        })
        }
     catch(error) {
         console.error(error.message);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const updateUser = async(req,res) => {
    try{
        const {id} = req.params;
        const {name, email, contact, age, password, role} = req.body;
        const updateUser = await userModel.findByIdAndUpdate(id, {
            name, email, contact, age, password, role
        },{new: true});
        if(!updateUser){
            return res.status(404).json({
                success: false,
                message: "Data was not updated"
            })
        }
        res.status(200).json({
            success: true,
            message: "Data updated successfully",
            user: updateUser
        })
    } catch(error) {
         console.error(error.message);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}