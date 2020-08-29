import express from 'express'
import {UserController} from '../controller/UserController'

const userController = new UserController()

export const user = express.Router()

user.post("/signup", userController.signUp)
user.post("/adminSignUp", userController.adminSignUp)