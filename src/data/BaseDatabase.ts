import Knex from 'knex'

export abstract class BaseDatabase {
    private static connection: Knex | null = null /*Var connection é static e começa como null*/
    protected getConnection(): Knex { /*Método getConnection do tipo Knex. Estabelece conexão com o BD*/
        if(BaseDatabase.connection === null){ /*Se for null, criamos conexão com o BD*/
            BaseDatabase.connection = Knex({
                client:'mysql', 
                connection: {
                    host: process.env.DB_HOST,
                    port: 3306,
                    user: process.env.DB_USER,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_DATABASE_NAME
                }
            })
        }
        return BaseDatabase.connection /*E retornamos a conexão estabelecida*/
    }

    public static async destroyConnection(): Promise<void> { /*Método assíncrono que destroi conexão*/
        if(BaseDatabase.connection){ /*Caso haja conexão, assíncronamente a destruímos*/
            await BaseDatabase.connection.destroy()
            BaseDatabase.connection = null /*Então a conexão se torna nula*/
        }
    }
}
