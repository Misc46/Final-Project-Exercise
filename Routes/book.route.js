const express = require('express')
const router = express.Router()
const {getBook,createBook,updateBook,deleteBook} = require('../Controllers/book.controller.js')

router.post('/create', createBook);
router.get('/:id', getBook);
router.put('/update/:id', updateBook);
router.delete('/delete/:id', deleteBook);

module.exports = router;