import Router from 'express-promise-router';
import { v4 as uuidv4 } from 'uuid';
import { deleteItem, getItems, putItem } from '../lib/db';
import { Todo } from '../lib/types';

const todoRouter = Router();

// GET /todos
todoRouter.get('/', async (req, res) => {
    res.send(await getItems());
});

// POST /todos
todoRouter.post('/', async (req, res) => {
    const data = req.body;
    if (!('title' in data) || typeof data.title !== 'string') {
        return res.status(400).send({ error: 'Invalid request body' });
    }
    const todo: Todo = { completed: false, title: data.title, id: uuidv4() };
    res.send(await putItem(todo));
});

// PATCH /todos/:id/toggle
todoRouter.patch('/:id/toggle', async (req, res) => {
    const { id } = req.params;
    if (!('completed' in req.body) || typeof req.body.completed !== 'boolean') {
        return res.status(400).send({ error: 'Invalid request body' });
    }
    if (!('title' in req.body) || typeof req.body.title !== 'string') {
        return res.status(400).send({ error: 'Invalid request body' });
    }
    const completed = req.body.completed;
    const title = req.body.title;
    res.send(await putItem({ id, title, completed }));
});

// DELETE /todos/:id
todoRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    res.send(await deleteItem(id));
});

export default todoRouter;
