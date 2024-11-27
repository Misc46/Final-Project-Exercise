const Book = require('../Models/book.model.js');
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
        if (req.query){
        const books = await Book.find(req.query);
        res.status(200).json({success:true,data:books});
        return
        }
        else{
          res.status(200).json({success:true, data:await Book.find({})})
        }
      } catch (error) {
        res.status(500).json({ success:false , message: error.message });
      }
    };

const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const profileBook = await Book.findByIdAndUpdate(id, req.body);
        if (!profileBook) {
            return res.status(404).json({message: "User not found"})
        }
        const profileBookUpdate = await Book.findById(id);
        res.status(200).json({success: true, message: true, data: profileBookUpdate})
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const profileBookDelete = await Book.findByIdAndDelete(id);
        if (!profileBookDelete) {
            return res.status(404).json({message: "Book not found"})
        }
        res.status(200).json({success: true, message: "Book Deleted successfully!"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports={
    getBook,createBook,updateBook,deleteBook
  }