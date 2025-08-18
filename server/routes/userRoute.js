import express from 'express'
import {registerUser, loginUser, logoutUser, isAuth} from '../controllers/userController.js'
import userAuth from '../middlewares/auth.js'


const userRouter = express.Router()

userRouter.post('/register', registerUser) 
userRouter.post('/login', loginUser)
userRouter.get('/is-auth', userAuth, isAuth) // Corrected to use GET method
userRouter.post('/logout', userAuth, logoutUser) // Added userAuth middleware

export default userRouter