import express from 'express'
import cors from 'cors';
import { AddressInfo } from 'net';
import dotenv from 'dotenv';
import {user} from './routes/Routes'

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
app.use("/user", user)

const server = app.listen(process.env.PORT || 3000, () => {
    if(server) {
        const address = server.address() as AddressInfo
        console.log(`Hieee. Here's ur server: http://localhost:${address.port}.`)
    } else {
        console.log('Failure upon starting server.')
    }
}) 

export default app;

