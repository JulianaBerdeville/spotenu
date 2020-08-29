import {UserDatabase} from '../data/UserDatabase'

export class UserBusiness{
    private userDatabase = new UserDatabase()

   public async allUsersSignUp(input: BusinessInput){ 
       /*Regras pra cadastro de usuários pagos ou ouvintes*/
        await this.userDatabase.freeUsersSignUp(
            input.id, 
            input.name, 
            input.email, 
            input.nickname, 
            input.password)

        if(input.password.length<6){
            throw new Error("Your password should be, at least, 6 characters long.")
        }
   }

    public async adminUsersSignUp(input: BusinessInput){
            await this.userDatabase.adminUsersSignUp(
                input.id,
                input.name,
                input.email, 
                input.nickname,
                input.password)
    
            if (input.password.length<10){
                    throw new Error("Your password should be, at least, 10 characters long.")
            }
    }
}

export interface BusinessInput{
    id: string,
    name: string,
    email: string, 
    nickname: string, 
    password: string
}