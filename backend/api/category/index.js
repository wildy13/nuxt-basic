const { Router } = require('express')
const { getCategory, createCategory } = require('./controller')

const router = new Router();

// GET

router.get('/', getCategory);

// POST 
router.post('/:id', createCategory);


module.exports = router;