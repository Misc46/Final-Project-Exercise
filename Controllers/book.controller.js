const Book = require('../models/book.model.js');
// const bcrypt = require('bcrypt');
// const saltRounds = 10

const createBook = async (req, res) => {
    try {
        const makeBook = await Book.create(req.body);
        res.status(200).json({success: 'true', message: 'true', data: makeBook})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getBook = async (req,res)=>{
  try {
    const books = await Book.find(req.query);
    res.status(200).json({success:true,data:books});
  } catch (error) {
    res.status(500).json({ success:false , message: error.message });
  }
};

module.exports={
    getBook,createBook
  }