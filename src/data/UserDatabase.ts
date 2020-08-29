import {BaseDatabase} from './BaseDatabase'

export class UserDatabase extends BaseDatabase{
private static TABLE_NAME: string = 'Users'

 public async freeUsersSignUp(id: string, name: string, email: string, nickname: string, password: string): Promise<void>{
            try{
                await this.getConnection()
                .raw(`INSERT INTO ${UserDatabase.TABLE_NAME}(id, name, nickname, email, password, role)
                VALUES (
                    "${id}",
                    "${name}",
                    "${nickname}",
                    "${email}",
                    "${password}",
                    "free_users"
                )`)
            } catch(e){
                throw new Error("Data insertion error: " + e.message)
            }
    }  

public async adminUsersSignUp(id: string, name: string, email: string, nickname: string, password: string): Promise<void>{
        try{
            await this.getConnection()
            .raw(`INSERT INTO ${UserDatabase.TABLE_NAME}(id, name, nickname, email, password, role))
            VALUES (
                "${id}",
                "${name}",
                "${nickname}",
                "${email}",
                "${password}",
                "admin"
            )`)
        } catch(e){
            throw new Error("Data insertion error: " + e.message)
        }
    }  

// public async bandSignUp(id)
        
public async becomePremiumUser(id: string): Promise<void>{
    try{
        await this.getConnection()
        .raw(`
                UPDATE ${UserDatabase.TABLE_NAME}(role))
                SET role = 'paid_users'
                WHERE (${id})
            `)
    } catch(e){
        throw new Error("Error changing user's role " + e.message)
    }
}

}