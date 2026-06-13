import jwt from "jsonwebtoken"
import { userModel } from "../models/user.model.js";

export const authMiddleware = async (req, res, next) => {
    try {
        console.log("req.headers: ", req.headers)
        const token = req.headers.authorization.split(' ')[1];
        console.log("token: ", token)
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded: ", decoded)
        if (!decoded) {
            return res.json({
                error: 'Unauthorized'
            })
        }

        // const user = await userModel.findById(decoded.id);


        // if (!user) {
        //     return res.json({
        //         error: 'Unauthorized'
        //     })
        // }
        req.user = decoded;
        next();
    } catch (error) {
        console.log("error: ", error)
        return res.json({
            error: 'Unauthorized'
        })
    }
}