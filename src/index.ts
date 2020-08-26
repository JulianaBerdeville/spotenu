import express, {Request, Response} from 'express'
import cors from 'cors';
import { AddressInfo } from 'net';

const app = express()
app.use(cors())
app.use(express.json)

const server = app.listen(process.env.PORT || 3000, () => {
    if(server) {
        const serverAddress = server.address() as AddressInfo
        console.log(`Hieee. Here's ur server: http://localhost:${serverAddress.port}.`)
    } else {
        console.log('Failure upon starting server.')
    }
}) 

export default app;

