import {UserDatabase} from '../data/UserDatabase'

export class UserBusiness{
    private userDatabase = new UserDatabase()

    public async FreeUsersSignUp(input: BusinessInput): Promise<any>{
        await this.userDatabase.signUp(input.id, input.name, input.email, input.nickname, input.password)
    }

    public async PaidUsersLogin(input: BusinessInput): Promise<any>{
       
    }
}

export interface BusinessInput{
    id: string,
    name: string,
    email: string, 
    password: string, 
    nickname: string,
    role: string
}