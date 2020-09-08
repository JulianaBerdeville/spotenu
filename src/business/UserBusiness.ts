import {UserDatabase} from '../data/UserDatabase'
import {queryUserInput} from '../data/UserDatabase'
import {queryBandInput} from '../data/UserDatabase'

export class UserBusiness{
    private userDatabase = new UserDatabase()

   public async insertCommonUsers(input: queryUserInput){ 
       /*Regras pra cadastro de usuários pagos ou ouvintes*/
        await this.userDatabase.createNewUsers(input)

        if(input.password.length<6){
            throw new Error("Your password should be, at least, 6 characters long.")
        }
   }

    public async insertAdminUser(input: queryUserInput){
            await this.userDatabase.createNewAdminUser(input)
    
            if (input.password.length<10){
                    throw new Error("Your password should be, at least, 10 characters long.")
            }
    }

    public async getUserByEmailOrNickname(login: string){
        return await this.userDatabase.login(login)
        
    }

    public async insertBand(input:queryBandInput){
        await this.userDatabase.bandSignUp(input)
        
        if(input.password.length<6){
            throw new Error("Your password should be, at least, 6 characters long.")
        }
    }
}

export interface BusinessLogin{
    login: string
}