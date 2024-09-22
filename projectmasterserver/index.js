require('dotenv').config()


const express= require('express')
const router=  require('./Routes/router')

const cors = require('cors')



const server=express()
server.use(express.json())
server.use(cors())
server.use(router)
// export uploads folder to client
server.use('/uploads',express.static('./uploads'))
require('./Database/connection')
const port = 5000 || process.env.port
server.listen(port, () => { console.log(`server running  @ http://localhost:5000`); })
