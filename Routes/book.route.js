const express = require('express')
const router = express.Router()
const {getBook,createBook,updateBook,deleteBook} = require('../Controllers/book.controller.js')

router.post('/create', createForums);
router.get('/:id', getBook);
router.put('/update/:id', updateForums);
router.delete('/delete/:id', deleteForums);

module.exports = router;