import { Router } from 'express';
import { createTask, deleteTask, getTasks, updateTask } from '../services/task';

export const router = Router();

router.post('/', async (req, res) => {
    const result = await createTask({ 
        title: req.body.title,
    })
    if (!result) return res.status(500).json({ error: 'Ocorreu um erro ao criar a tarefa!' });
    res.status(201).json({ result });
})

router.get('/', async (req, res) => {
    const result = await getTasks()
    if (!result) return res.status(500).json({ error: 'Ocorreu um erro ao buscar as tarefas!' });
    res.status(201).json({ result });
})

router.put('/', async (req, res) => {
    const result = await updateTask(req.body.id, req.body);
    if (!result) return res.status(500).json({ error: 'Ocorreu um erro ao atualizar a tarefa!' });
    res.status(201).json({ result });
})

router.delete('/', async (req, res) => {
    const result = await deleteTask(req.body.id);
    if (!result) return res.status(500).json({ error: 'Ocorreu um erro ao excluir a tarefa!' });
    res.status(201).json({ result });
})