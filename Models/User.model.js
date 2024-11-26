const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        synopsis: {
            type: String,
            default: "",
        },
        genres: [
            {
                type: String,
            },
        ],
        author: {
            type: String,
            required: true,
        },
        chapters: {
            type: Number,
            default: 0,
        },
        status: {
            type: String,
            enum: ["Ongoing", "Completed", "Hiatus"],
            default: "Ongoing",
        },
        startDate: {
            type: Date,
        },
        endDate: {
            type: Date,
        },
        rating: {
            type: String,
            default: "",
        },
        coverImage: {
            type: String,
            default: "",
        },
        reviews: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Review",
            },
        ],
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;