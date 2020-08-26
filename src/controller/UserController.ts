import express, {Request, Response} from "express"
import app from "../index"
import {IdGenerator} from "../services/IdGenerator"
import {HashGenerator} from "../services/HashGenerator"
import {Authenticator} from "../services/Authenticator"
import {UserDatabase} from "../data/UserDatabase"

app.post("SignUp", async(req: Request, res: Response) => {
    try {
        const name = req.body.name
        const email = req.body.email
        const nickname = req.body.nickname
        const password = req.body.password

        /*Validando informações fornecidas no body*/
        if (!name || email || nickname || password){
            throw new Error("Oops! Something's missing")
        }
        if(password.length<6){
            throw new Error("Your password must have, at least, 6 characters long.")
        }
    
        /*Gerando um id ao usuário*/
        const idGenerator = new IdGenerator()
        const id = idGenerator.generateId()
    
        /*Encriptando a senha do usuário*/
        const hashGenerator = new HashGenerator()
        const hashedPassword = await hashGenerator.hash(password)

        const userDatabase = new UserDatabase()
        await userDatabase.signUp(id, name, email, nickname, hashedPassword)

        const authenticator = new Authenticator()
        const token = authenticator.generateToken({id})

        res.status(200).send({message: "Welcome. Here's your access token: ", token})
    } catch(error){
        res.status(400).send({message: "Oops! Something's wrong: ", error})
    }
})

app.get("/getBands", async(req: Request, res: Response) => {
    res.status(200).send({message: 'it works!'})
})