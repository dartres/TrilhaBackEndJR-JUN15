
import { Router } from 'express';
import { createTask, listTasks, getTaskById, updateTask, deleteTask } from '../controllers/taskController.js';
import authenticateToken from '../middlewares/authMiddleware.js';
const taskRouter = Router();

taskRouter.post('/create', authenticateToken, createTask);
taskRouter.get('/', authenticateToken, listTasks); 
taskRouter.get('/read/:id', authenticateToken, getTaskById); 
taskRouter.put('/update/:id', authenticateToken, updateTask);  
taskRouter.delete('/delete/:id', authenticateToken, deleteTask); 

export default taskRouter;
