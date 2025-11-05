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
       const updates = {...req.body};
       if(Object.keys(updates).length === 0) {
        return res.status(404).json({
            success: false,
            message: "No data to update"
        })
       }
       if(updates.password) {
        updates.password = await passwordHashing(updates.password)
       }
const updatedData = await userModel.findByIdAndUpdate(id,
updates, {new: true}) 
       if(!updatedData) {
        return res.status(404).json({
            success: false,
            message: "User data was not updated"
        })
       }
       res.status(200).json({
        success: true,
        message: "User data updated successfully",
        user: updatedData
       })
    } catch(error) {
         console.error(error.message);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const deleteUser = async(req,res) => {
    try{
        const {id} = req.params;
        const deleteOne = await userModel.findByIdAndDelete(id);
        if(!deleteOne) {
            return res.status(404).json({
                success: false,
                message: "User could not be deleted"
            })
        }
        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        })
    } catch(error) {
         console.error(error.message);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const findUserById = async(req,res) => {
    try{
        const {id} = req.params;
        const userId = await userModel.findById(id);
        if(!userId) {
            return res.status(404).json({
                success: false,
                message: "User could not be found"
            })
        }
        res.status(200).json({
            success: true,
            message: "User Id found",
            user: userId
        })
    } catch(error) {
        console.error(error.message);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}