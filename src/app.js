import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger-output.json' assert { type: 'json' }; 
const app = express();
app.use(express.json());

import { createTableUsers } from './models/createTableUsers.js';
import { createTableTasks } from './models/createTableTasks.js';
import router from './routes/user.js';
import taskRouter from './routes/task.js';

const PORT = process.env.PORT;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/users', router);
app.use('/task', taskRouter);

createTableUsers();
createTableTasks();

app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));
