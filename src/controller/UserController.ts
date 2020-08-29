import {Request, Response} from "express"
import {IdGenerator} from "../services/IdGenerator"
import {HashGenerator} from "../services/HashGenerator"
import {Authenticator} from "../services/Authenticator"
import {UserBusiness} from "../business/UserBusiness"


export class UserController {
     async signUp (req: Request, res: Response){
        try {
            /*Gerando um id ao usuário*/
            const idGenerator = new IdGenerator()
            const id = idGenerator.generateId()

            /*Encriptando a senha do usuário*/
            const hashGenerator = new HashGenerator()
            const hashedPassword = await hashGenerator.hash(req.body.password) 

            const body = {
             id,
             name: req.body.name,
             email: req.body.email,
             nickname: req.body.nickname,
             password: hashedPassword
            }

            /*Validando informações fornecidas no body*/
            if (!body.name || !body.email || !body.nickname || !body.password){
                throw new Error("Oops! Something's missing")
            }
           
            const userBusiness = new UserBusiness()
            await userBusiness.allUsersSignUp(body)
            const role = "free_users"
            const authenticator = new Authenticator()
            const token = authenticator.generateToken({id, role})
            
            res.status(200).send({
                message: `Welcome, ${body.name}. Check your access token below: `, token
            })
        } catch(e){
            res.status(400).send({e})
        }
    }
   
    async adminSignUp(req: Request, res: Response){
        try{

            const idGenerator = new IdGenerator()
            const id = idGenerator.generateId()

            const hashGenerator = new HashGenerator()
            const hashedPassword = await hashGenerator.hash(req.body.password)

            const body = {
                id,
                name: req.body.name,
                email: req.body.email,
                nickname: req.body.nickname,
                password: hashedPassword,
            }

            if (!body.name || !body.email || !body.nickname || !body.password){
                throw new Error("Oops! Something's missing")
            }

            const userBusiness = new UserBusiness()
            await userBusiness.adminUsersSignUp(body)
            const role = "admin"

            const authenticator = new Authenticator()
            const token = authenticator.generateToken({id, role})

            const headers= req.headers.authorization as string
            authenticator.verify(headers)

            res.status(200).send({
                message: `Welcome, ${body.name}. You're an admin user. Check your access token below: `, token
            })
        } catch(e){
            res.status(400).send({e})
        }
    }
}
