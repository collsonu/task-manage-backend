import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    
    try { 
        const token = req.cookies?.accessToken || req.headers("Authorization")?.replace("Bearer ", "")
        console.log(token);
        if (!token) {
            res.status(401).json({ error: 'Unauthorized request' });
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id).select("-password")
        if (!user) {
            res.status(401).json({ error: 'Invalid Access Token' });

        }

        req.user = user;
        next()
    } catch (error) {
        res.status(401).json({ error: error.message });
    }

})