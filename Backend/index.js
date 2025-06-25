import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'
import route from './router.js'
import dotenv from 'dotenv';



dotenv.config();


const app = express()

const port = 4000;

app.use(cors())

app.use(express.json())

app.use('/api',route)

const connecttoDb = ()=>{
    mongoose.connect('mongodb+srv://naveendas975:zdsPz70UojQdeP7h@bookshopping.ojnx6eu.mongodb.net/?retryWrites=true&w=majority&appName=Bookshopping')
    .then(()=>console.log('Db connected'))
    .catch(() => console.error('Db connection error'))
}

connecttoDb()

app.listen(port,()=>{
    console.log('server running on 4000')
})