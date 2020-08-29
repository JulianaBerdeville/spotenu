import * as jwt from 'jsonwebtoken'

export class Authenticator {
    private static getExpiresIn(): number {
        return Number(process.env.ACCESS_TOKEN_EXPIRES_IN)
    }

    public generateToken(data: AuthenticationData): string {
        return jwt.sign(
            data,
            process.env.JWT_KEY as string,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
            }
        ) /*Este método retorna o token, que é uma string*/
         
    }

    public verify(token: string): AuthenticationData { /*Método que verifica o token*/
        const data = jwt.verify(
            token, 
            process.env.JWT_KEY as string
        ) as any
         
        const result = {
            id: data.id,
                role: data.role
        }
        return result
    }
}
interface AuthenticationData{
     id: string,
     role: string
}