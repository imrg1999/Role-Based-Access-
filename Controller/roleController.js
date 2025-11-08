import userModel from "../Model/userModel.js";


export const userAccess = async(req,res) => {
    try{
        const user = await userModel.findById(req.user.id).select("-password");
        if(!user) {
        return res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            })
        }
        res.status(200).json({
            success: true,
            message: "Log in Successful",
            data: user
        })
    }catch(error) {
        console.error(error.message);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const adminAccess = async(req,res) => {
    try{
        const admin = await userModel.findById(req.user.id).select("-password");
        if(!admin) {
        return  res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            })
        }
        res.status(200).json({
            success: true,
            message: "Welcome Admin",
            data: admin
        })
    }catch(error) {
         console.error(error.message);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


export const managerAccess = async(req,res) => {
    try{
        const manager = await userModel.findById(req.user.id).select("-password");
        if(!manager) {
        return  res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            })
        }
        res.status(200).json({
            success: true,
            message: "Welcome Manager",
            data: manager
        })
    }catch(error) {
         console.error(error.message);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}