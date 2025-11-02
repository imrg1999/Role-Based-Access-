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