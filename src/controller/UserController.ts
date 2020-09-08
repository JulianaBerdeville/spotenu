import {Request, Response} from "express"
import {IdGenerator} from "../services/IdGenerator"
import {HashGenerator} from "../services/HashGenerator"
import {Authenticator} from "../services/Authenticator"
import {UserBusiness} from "../business/UserBusiness"
import {BaseDatabase} from "../data/BaseDatabase"
import {UserDatabase} from "../data/UserDatabase"


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
            await userBusiness.insertCommonUsers(body)
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
            console.log(body)

            if (!body.name || !body.email || !body.nickname || !body.password){
                throw new Error("Oops! Something's missing")
            }

            const userBusiness = new UserBusiness()
            await userBusiness.insertAdminUser(body)
            const role = "admin"

            const authenticator = new Authenticator()
            const token = authenticator.generateToken({id: id, role: role})

            const headers= req.headers.authorization as string
            const isAdmin = authenticator.verify(headers)

            if (isAdmin.role !== 'admin'){
                throw new Error("Please, provide admin access token to proceed.")
            }

            res.status(200).send({
                message: `Welcome, ${body.name}. You're an admin user. Check your access token below: `, token
            })
        } catch(e){
            res.status(400).send({message: "Only admin users are allowed to add other admin user. Please, provide authorization token."})
        }
    }

    async login(req: Request, res: Response){
        try{
                const body = {
                    login: req.body.login,
                    password: req.body.password
                }
            
                const userBusiness = new UserBusiness() 
                const user = await userBusiness.getUserByEmailOrNickname(body.login)

                if (!user){
                    throw new Error ("Email or nickname provided might be wrong.")
                }

                const hashGenerator= new HashGenerator()
                const result = await hashGenerator.compare(body.password, user.password)

                if (!result){
                    throw new Error ("Some of the user informations provided are incorrect.")
                }

                const authenticator = new Authenticator()
                const token = authenticator.generateToken({id: user.id, role: user.role})

                res.status(200).send({message: `Wellcome again,${user.name}. Here's your access token:`, token})
        } catch(e){
            res.status(400).send({message: 'Something went wrong in the endpoint.' + e.message})
        }
        await BaseDatabase.destroyConnection()
    }

    async bandSignUp(req: Request, res: Response){
        try {
            /*Gerando um id à banda*/
            const idGenerator = new IdGenerator()
            const id = idGenerator.generateId()

            /*Encriptando a senha da banda*/
            const hashGenerator = new HashGenerator()
            const hashedPassword = await hashGenerator.hash(req.body.password) 

            const role="band"

            const body = {
             id,
             name: req.body.name, 
             email: req.body.email,
             nickname: req.body.nickname,
             password: hashedPassword,
             role,
             description: req.body.description,
             isBandApproved: 0
            }
            /*Validando informações fornecidas no body*/
            if (!body.name || !body.email || !body.nickname || !body.password || !body.description){
                throw new Error("Oops! Something's missing")
            }
           
            const userBusiness = new UserBusiness()
            await userBusiness.insertBand(body) 
            
            res.status(200).send({
                message: `Welcome, ${body.name}. You will receive news about the band's approval soon.`})
        } catch(e){
            res.status(400).send({message: "Something went wrong in the endpoint: " + e})
        }
    }

    async getAllBands(req: Request, res: Response){
        try{
            const headers= req.headers.authorization as string
            const authenticator = new Authenticator()
            const isAdmin = authenticator.verify(headers)

            if (isAdmin.role !== 'admin'){
                throw new Error("Please, provide admin access token to proceed.")
            }

            const userDatabase = new UserDatabase()
            const bands =  await userDatabase.getAllBands()

            console.log(bands)
            res.status(200).send({bands})
                

        } catch(error){
            res.status(400).send({message: "Something went wrong with the endpoint: " + error.message})
        }
    }

    async gettingBandApproved(req: Request, res: Response){
         try{
             const headers= req.headers.authorization as string
             const authenticator = new Authenticator()
             const isAdmin = authenticator.verify(headers)

             if (isAdmin.role !== 'admin'){
                 throw new Error("Please, provide admin access token to proceed.")
             }
            
            const name = req.body.name
             
             const userDatabase = new UserDatabase()
             await userDatabase.approveBand(name)

             res.status(200).send({message:`Right on! ${name}'s just approved!`})

         } catch(error){
             res.status(400).send({message: "Something went wrong with the endpoint: " + error.message})
         }
    }
}
