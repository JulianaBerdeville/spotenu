import * as jwt from 'jsonwebtoken'

export class Authenticator {
    private static getExpiresIn(): number {
        return Number(process.env.ACCESS_TOKEN_EXPIRES_IN)
    }

    public generateToken(data: AuthenticationData): string {
        return jwt.sign(data, 
                process.env.JWT_KEY as string, 
                {expiresIn: Authenticator.getExpiresIn()}
                ) /*Este método retorna o token, que é uma string*/
         
    }

    public verify(token: string): AuthenticationData { /*Método que verifica o token*/
        const data = jwt.verify(token,
                                process.env.JWT_KEY as string, 

                                ) as any
        return { id: data.id }
    }
}
interface AuthenticationData{
     id: string
}