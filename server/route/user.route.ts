import { Router } from "express";
import { registerUser, activateUser, loginUser, logoutUser, updateAccessToken, getUserInfo } from './../controllers/user.controller';
import { isAuthenticated } from "../middleware/auth";

const userRouter = Router()

userRouter.post('/registration', registerUser)
userRouter.post('/activate-user', activateUser)
userRouter.post('/login', loginUser)
userRouter.get('/logout', updateAccessToken, isAuthenticated, logoutUser)
// userRouter.get('/refresh-token', updateAccessToken)
userRouter.get('/refresh-token', (req, res, next) => {
    updateAccessToken(req, res, next)
    res.status(201).json({
        message: "Refreshed Token successfully"
    })
})
userRouter.get('/userinfo', updateAccessToken, isAuthenticated, getUserInfo)



export default userRouter