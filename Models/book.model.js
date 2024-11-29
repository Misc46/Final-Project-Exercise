const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
    {
        rank:{
            type: Number,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
            default: "",
        },
        type:{
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
        members: {
            type: Number,
            required: true,
            default: 0,
        },
        score: {
            type: Number,
            required: true,
            default: 0,
        },
        author: {
            type: String,
            required: false,
            default: "This Guy"
        }
    },
    { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
