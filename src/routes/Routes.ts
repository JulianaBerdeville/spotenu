import express from 'express'
import {UserController} from '../controller/UserController'

const userController = new UserController()

export const user = express.Router()

user.post("/signup", userController.signUp)
user.post("/adminSignUp", userController.adminSignUp)
user.post("/login", userController.login)
user.post("/bandSignUp", userController.bandSignUp)
user.get("/getAllBands", userController.getAllBands)
user.post("/gettingBandApproved", userController.gettingBandApproved)