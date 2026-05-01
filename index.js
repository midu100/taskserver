const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const dbConfig = require('./dbConfig')
const route  = require('./routes')
require('dotenv').config()
const app = express()
const port = 8000

app.use(express.json())
app.use(cors())
dbConfig()
app.use(cookieParser())
app.use(route)




app.listen(port,()=>{
    console.log('server is running...')
})