import dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    let token = authHeader;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7); 
    }

    if (token == null) return res.status(401).json({ msg: 'Token não fornecido' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ msg: 'Token inválido' });

        req.user = user; 
        next(); 
    });
};

export default authenticateToken;
