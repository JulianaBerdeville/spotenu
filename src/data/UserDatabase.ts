import {BaseDatabase} from './BaseDatabase'

export class UserDatabase extends BaseDatabase{
private static TABLE_NAME: string = 'Users'
private static BANDS_TABLE: string = 'Bands'

    public async createNewUsers(input: queryUserInput): Promise<void>{
            try{
                await this.getConnection()
                .raw(`INSERT INTO ${UserDatabase.TABLE_NAME}(id, name, nickname, email, password, role)
                VALUES (
                    "${input.id}",
                    "${input.name}",
                    "${input.nickname}",
                    "${input.email}",
                    "${input.password}",
                    "free_users"
                )`)
            } catch(e){
                throw new Error("Data insertion error: " + e.message)
            }
    }  

    public async createNewAdminUser(input: queryUserInput): Promise<void>{
        try{
            await this.getConnection()
            .raw(`INSERT INTO ${UserDatabase.TABLE_NAME}(id, name, nickname, email, password, role)
                VALUES (
                    "${input.id}",
                    "${input.name}",
                    "${input.nickname}",
                    "${input.email}",
                    "${input.password}",
                    "admin")`
                )
        } catch(e){
            throw new Error("Data insertion error: " + e.message)
        }
    }  

    public async bandSignUp(input: queryBandInput): Promise<any>{
    try{
        await this.getConnection()
        .raw(`INSERT INTO ${UserDatabase.BANDS_TABLE}(id, name, nickname, email, password, role, description, band_approved)
            VALUES (
                "${input.id}",
                "${input.name}",
                "${input.nickname}",
                "${input.email}",
                "${input.password}",
                "band",
                "${input.description}",
                0)`
            )
    } catch(e){
        throw new Error("Data insertion error: " + e.message)
    }
    }

    public async becomePremiumUser(id: string): Promise<void>{
    try{
        await this.getConnection()
        .raw(`
                UPDATE ${UserDatabase.TABLE_NAME}
                SET role = "paid_users"
                WHERE id = "${id}"
            `)
    } catch(e){
        throw new Error("Error changing user's role " + e.message)
    }
    }

    public async login(login: string): Promise<any>{
    try{
        const result = await this.getConnection()
       .select("*")
       .from(UserDatabase.TABLE_NAME)
       .where({email: login})
       .orWhere({nickname: login})

        return result[0]
    } catch(e){
        throw new Error("Login failed: " + e.message)
    }
    }

    public async getAllBands(): Promise<any>{
        try{
            const result = await this.getConnection()
            .select("name", "email", "nickname", "band_approved")
            .from(UserDatabase.BANDS_TABLE)as string

            return result
        } catch(e){
            throw new Error("Query failed: " + e.message)
        }
    }

    public async approveBand (name: string): Promise<void>{
         try{
             await this.getConnection()
             .raw(`
                    UPDATE ${UserDatabase.BANDS_TABLE}
                    SET band_approved = 1
                    WHERE name = "${name}"
                `)     
         } catch(e){
             throw new Error("Query failed: " + e.message)
         }
    }
}

export interface queryUserInput{
    id: string, 
    name: string, 
    email: string, 
    nickname: string, 
    password: string
}

export interface queryBandInput{
    id: string, 
    name: string, 
    email: string, 
    nickname: string, 
    password: string,
    description: string,
    isBandApproved: number
}