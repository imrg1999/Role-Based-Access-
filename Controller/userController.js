import userModel from "../Model/userModel.js";


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
        const newUser = await userModel.create({name, email, contact, age, password, role});
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