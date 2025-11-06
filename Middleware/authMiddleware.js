import jwt from 'jsonwebtoken';

export const authMiddleware = (req,res,next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
       return res.status(400).json({
            success: false,
            message: "Invalid header"
        })
    }

    const token = authHeader.split(' ')[1];
    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    }catch(error) {
        res.status(401).json({
            success: false,
            message: "Invalid Token"
        })
    }
    
}