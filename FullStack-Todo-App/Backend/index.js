import express from 'express'
const app = express()
import 'dotenv/config'
import mongoose from 'mongoose'
const port = process.env.port
const DB_URL = process.env.mongodb_url
import todoRoute  from '../Backend/routes/todo.routes.js'
import userRoute  from '../Backend/routes/user.routes.js'
import cors from 'cors'
// database connection code 

try{
   await  mongoose.connect(DB_URL)
    console.log("databse connected")
} catch (error){
    console.log(error)
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//middelwares 
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials:true , 
  methods: "PUT , GET , DELETE ,POST" , 
  allowedHeaders: ["contend-Type " , "Authorization"]
}));


// Routes

app.use("/todo" , todoRoute) 
app.use("/user" , userRoute) 
app.listen(port, () => {
  console.log(` app listening on port ${port}`)
})