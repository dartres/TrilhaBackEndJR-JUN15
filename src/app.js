import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
app.use(cors());

import express from 'express';
const app = express();
app.use(express.json());

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger-output.json' assert { type: 'json' }; 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const PORT = process.env.PORT;

import { createTableUsers } from './models/createTableUsers.js';
import { createTableTasks } from './models/createTableTasks.js';
createTableUsers();
createTableTasks();

import router from './routes/user.js';
import taskRouter from './routes/task.js';
app.use('/users', router);
app.use('/task', taskRouter);

app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));
