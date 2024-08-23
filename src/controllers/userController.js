import dotenv from 'dotenv';
dotenv.config();

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/User.js'; // Corrija o caminho se necessário

// Criar usuário
async function createUser(req, res) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ msg: 'Todos os campos devem ser preenchidos' });
        }

        const existingUser = await UserModel.findByEmail(email);

        if (existingUser) {
            return res.status(400).json({ msg: 'E-mail já cadastrado' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = { name, email, password: hashedPassword }; // Corrija aqui
        const response = await UserModel.create(user);

        res.status(201).json({ response, msg: 'Usuário criado com sucesso' });
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({ msg: 'Erro interno do servidor' });
    }
}

const JWT_SECRET = process.env.JWT_SECRET 

// Logar usuário
async function authenticateUser(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ msg: 'E-mail e senha são necessários' });
        }

        const user = await UserModel.findByEmail(email);

        if (user) {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                const token = jwt.sign(
                    { id: user.id, email: user.email },
                    JWT_SECRET,
                    { expiresIn: '1h' }
                );

                res.status(200).json({ msg: 'Usuário autenticado com sucesso', token });
            } else {
                res.status(400).json({ msg: 'Senha incorreta' });
            }
        } else {
            res.status(404).json({ msg: 'Usuário não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao autenticar usuário:', error);
        res.status(500).json({ msg: 'Erro interno do servidor' });
    }
}


export { createUser, authenticateUser };
