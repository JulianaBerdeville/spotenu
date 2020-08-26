import bcrypt from 'bcryptjs'

export class HashGenerator{
    public async hash(text: string): Promise<string>{
        const rounds = Number(process.env.BCRYPT_COST) /*Custo do algoritmo - maior, mais complexo o processo de hash*/
        const salt = await bcrypt.genSalt(rounds)/*Ferramenta que encripta com base no custo*/

        return bcrypt.hash(text, salt) /*Método retorna o texto encriptado com base no salts*/
    }

    public async compare(text: string, hash: string): Promise<boolean>{
        return bcrypt.compare(text, hash) /*Método que verifica se o texto e hash são os mesmos*/
        /*Retorna true ou false de acordo com o resultado.*/
    }  
}