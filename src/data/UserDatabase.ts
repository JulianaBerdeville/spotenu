import {BaseDatabase} from './BaseDatabase'

export class UserDatabase extends BaseDatabase{
    private static TABLE_NAME: string = 'Users'

    public async signUp(id: string, name: string, email: string, nickname: string, password: string): Promise<void>{
            await this.getConnection()
                .insert({
                    id,
                    name,
                    email,
                    nickname,
                    password
                }).into(UserDatabase.TABLE_NAME)
    }
    
            
}