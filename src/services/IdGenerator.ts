import {v4} from "uuid"


export class IdGenerator{
    public generateId() {
        return v4() /*Retorna o ID como uma string, segundo a versão 4 do uuid*/
    }
}