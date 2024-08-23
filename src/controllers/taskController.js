import { TaskModel } from '../models/Task.js';

async function createTask(req, res) {
    try {
        const { title, content, done } = req.body;

        if (!title || !content || done === undefined) {
            return res.status(400).json({ msg: 'Todos os campos devem ser preenchidos' });
        }

        if (![0, 1].includes(done)) {
            return res.status(400).json({ msg: 'Concluído deve ser 0 (false) ou 1 (true)' });
        }

        const task = { title, content, done };
        const response = await TaskModel.create(task);

        res.status(201).json({ response, msg: "Tarefa criada com sucesso!" });
    } catch (error) {
        console.error('Erro ao criar tarefa:', error); 
        res.status(500).json({ msg: 'Erro interno do servidor' }); 
    }
};

// Listar todas as tarefas
async function listTasks(req, res) {
    try {
        const tasks = await TaskModel.list();
        res.status(200).json(tasks);
    } catch (error) {
        console.error('Erro ao listar tarefas:', error);
        res.status(500).json({ msg: 'Erro interno do servidor' });
    }
}

// Buscar uma tarefa pelo ID
async function getTaskById(req, res) {
    try {
        const { id } = req.params;
        const task = await TaskModel.getById(id);

        if (task) {
            res.status(200).json(task);
        } else {
            res.status(404).json({ msg: 'Tarefa não encontrada' });
        }
    } catch (error) {
        console.error('Erro ao buscar tarefa:', error);
        res.status(500).json({ msg: 'Erro interno do servidor' });
    }
}

async function updateTask(req, res) {
    try {
        const { id } = req.params;
        const { title, content, done } = req.body;

        if (!id) {
            return res.status(400).json({ msg: 'ID da tarefa é necessário' });
        }

        if (!title && !content && done === undefined) {
            return res.status(400).json({ msg: 'Pelo menos um campo deve ser fornecido para atualização' });
        }

        const updates = [];
        const values = [];

        if (title) {
            updates.push('title = ?');
            values.push(title);
        }
        if (content) {
            updates.push('content = ?');
            values.push(content);
        }
        if (done !== undefined) {
            if (![0, 1].includes(done)) {
                return res.status(400).json({ msg: 'Concluído deve ser 0 (false) ou 1 (true)' });
            }
            updates.push('done = ?');
            values.push(done);
        }

        values.push(id);

        if (updates.length === 0) {
            return res.status(400).json({ msg: 'Nenhum campo válido para atualizar' });
        }

        const query = `UPDATE tasks SET ${updates.join(', ')} WHERE id = ?`;
        const result = await TaskModel.update(query, values);

        if (result.changes > 0) {
            res.status(200).json({ msg: 'Tarefa atualizada com sucesso!' });
        } else {
            res.status(404).json({ msg: 'Tarefa não encontrada' });
        }
    } catch (error) {
        console.error('Erro ao atualizar tarefa:', error);
        res.status(500).json({ msg: 'Erro interno do servidor' });
    }
}


// Deletar uma tarefa pelo ID
async function deleteTask(req, res) {
    try {
        const { id } = req.params;
        const result = await TaskModel.delete(id);

        if (result.changes > 0) {
            res.status(200).json({ msg: 'Tarefa deletada com sucesso!' });
        } else {
            res.status(404).json({ msg: 'Tarefa não encontrada' });
        }
    } catch (error) {
        console.error('Erro ao deletar tarefa:', error);
        res.status(500).json({ msg: 'Erro interno do servidor' });
    }
}

export { createTask, listTasks, getTaskById, updateTask, deleteTask };
