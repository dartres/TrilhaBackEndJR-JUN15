import {openDb} from './configDB.js';
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const app = express()

app.get('/',(req, res) => {
    res.status(200).json({msg: 'Bem vindo!'})
})

app.listen(3000, ()=>console.log('API rodando'))