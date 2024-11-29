const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username:{
        type:String,
        required: true,
        unique: true,
        minlength:[3,`Userame too short.`],
        maxlength:[32,`Username too long.`]
    },
    password:{
        type:String,
        required:true
    },
    list: {
        type: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
          },
        ],
        validate: {
          validator: function (value) {
            // Ensure no duplicates
            return Array.isArray(value) && new Set(value.map(String)).size === value.length;
          },
          message: 'List contains duplicate entries!',
        },
        set: function (value) {
          // Automatically remove duplicates when setting the array
          return [...new Set(value.map(String))];
        },
    }
}
)

const User = mongoose.model("User",userSchema);

module.exports = User;