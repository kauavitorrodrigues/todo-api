import { Router } from 'express';
import { createUser, deleteUser, getUsers, updateUser } from '../services/user';

export const router = Router();

router.post('/', async (req, res) => {

    const result = await createUser({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    if (!result) return res.status(500).json({ 
        error: 'Erro ao registrar o usuário' 
    });

    const response = {
        id: result.id,
        name: result.name,
        email: result.email
    }

    res.status(201).json(response);

})

router.post('/login', async (req, res) => {
    res.json({ message: 'Login efetuado com sucesso' });
})

router.get('/', async (req, res) => {
    const result = await getUsers()
    if (!result) return res.status(500).json({ error: 'Erro ao buscar os usuários' });
    res.status(201).json({ result });
})

router.put('/', async (req, res) => {
    const result = await updateUser(
        req.body.id,
        {   
            name: req.body.name, 
            email: req.body.email,
            password: req.body.password
        }
    )
    if (!result) return res.status(500).json({ error: 'Erro ao atualizar o usuário' });
    res.status(201).json({ result });
})

router.delete('/', async (req, res) => {
    const result = await deleteUser(req.body.id);
    if (!result) return res.status(500).json({ error: 'Erro ao excluir o usuário' });
    res.status(201).json({ result });
})