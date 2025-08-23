import express from 'express'
import { sellerLogin, isSellerAuth, sellerLogout } from '../controllers/sellerController.js'
import sellerAuth  from '../middlewares/authSeller.js'

const sellerRouter = express.Router()

sellerRouter.post('/login', sellerLogin)
sellerRouter.get('/is-auth', sellerAuth, isSellerAuth) 
sellerRouter.get('/logout', sellerAuth, sellerLogout) 

export default sellerRouter