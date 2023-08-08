const { Router } = require('express')
const { getUser, getMe,  createUser, editUsers, deleteUsers, changePassword } = require('./controller')

const router = new Router();

// GET

router.get('/', getUser);
router.get('/me', getMe);

// POST 
router.post('/', createUser);
router.post('/delete', deleteUsers)

// PUT Router
router.put('/:id', editUsers);
router.put('/change/:id', changePassword)

module.exports = router;