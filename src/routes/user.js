import { Router } from 'express';
import { createUser, authenticateUser } from '../controllers/userController.js';

const router = Router();

router.post('/register', async (req, res) => {
    try {
        await createUser(req, res);
    } catch (error) {
        res.status(500).json({ msg: 'Erro ao criar usuário' });
    }
});

router.post('/login', authenticateUser);
export default router;