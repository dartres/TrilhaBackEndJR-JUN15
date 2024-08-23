import dotenv from 'dotenv';
dotenv.config();

import express from 'express';

import { createTableUsers } from './models/createTableUsers.js';
import { createTableTasks } from './models/createTableTasks.js';
import router from './routes/user.js';
import taskRouter from './routes/task.js';


console.log('JWT_SECRET:', process.env.JWT_SECRET);

const app = express();
app.use(express.json());
app.use('/users', router);
app.use('/task', taskRouter);

 createTableUsers();
 createTableTasks();

app.listen(3000, () => console.log('API rodando na porta 3000'));
