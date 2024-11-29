const Book = require('../Models/book.model.js');
const User = require('../Models/user.model.js');
const bcrypt = require('bcrypt');
const saltRounds = 10

const getUser = async (req,res)=>{
  try {
    if (req.query){
    const users = await User.find(req.query,"username name");
    res.status(200).json({success:true,data:users});
    return
    }
    else{
      res.status(200).json({success:true, data:await User.find({},"username name")})
    }
  } catch (error) {
    res.status(500).json({ success:false , message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const passwordHash = await bcrypt.hash(req.body.password,saltRounds);
    var user = await User.create({username:req.body.username,password:passwordHash,email:req.body.email});
    user = await User.findById(user.id,"-password");
    res.status(200).json({success:true,message: "Successfully created new user." ,data:user});
  } catch (error) {
    res.status(500).json({ success:false, message: error.message });
  }
};

const login = async(req,res)=>{
  try{
    const user = await User.findOne({username:req.body.username});
    if (!user){
      res.status(403).json({success:false, message:"Incorrect login credentials"});
      return
    }
    const password = await bcrypt.compare(req.body.password,user.password)
    if (!password){
      res.status(403).json({success:false, message:"Incorrect login credentials"});
      return
    }
    res.status(200).json({success:true,message:`Successfully logged in as @${user.username}`,data:await User.findById(user.id,"-password")});

  }
  catch(err){
    res.status(500).json({ success: false ,message: err.message });
  }
}

const deleteUser = async(req,res)=>{  
  try{
    const user = await User.findOne({username:req.body.username});
    if (!user){
      res.status(403).json({success:false,message:"Incorrect login credentials"});
      return
    }
    const password = await bcrypt.compare(req.body.password,user.password)
    if (!password){
      res.status(403).json({success:false,message:"Incorrect login credentials"});
      return
    }
    await User.findByIdAndDelete(user.id)
    res.status(200).json({sucess:true ,message:`Deleted ${user.name} (@${user.username})`});  
  }
  catch(err){
    res.status(500).json({success: false, message: err.message });
}
}

const editUser = async (req,res)=>{
  try{
    const user = await User.findOne({username:req.body.username});
    if (!user){
      res.status(403).json({success:false,message:"Incorrect login credentials"});
      return
    }
    const password = await bcrypt.compare(req.body.password,user.password)
    if (!password){
      res.status(403).json({success:false ,message:"Incorrect login credentials"});
      return
    }
    let newData = {};
    if(req.body.newpassword){newData.password = bcrypt.hash(req.body.newpassword,saltRounds);}
    if (req.body.newname){newData.name = req.body.newname}
    if (req.body.newusername){newData.username = req.body.newusername}
    await User.findByIdAndUpdate(user.id,newData);
    res.status(200).json({sucess:true, message:"Successfully updated credentials"});
  }
  catch (err){
    res.status(500).json({ success: false, message: err.message });
  }
}

const getList = async(req,res)=>{
  try{
    const user = await User.findById(req.params.id,"list").populate("list");
    res.status(200).json({success:true,data:user.list});
  }
  catch (error){
    res.status(500).json({success:false,message:error.message});
  }
}

const addToList = async (req, res) => {
  try {
    user = await User.findById(req.params.id);
    // Check if a list item is provided
    if (req.body.list) {
      // Update the list using $addToSet and fetch the updated user document
      const updatedUser = await User.findByIdAndUpdate(
        user.id,
        { $addToSet: { list: req.body.list } },
        { new: true } // Return the updated user document
      ).populate("list"); // Populate the list with Book details

      // Fetch the book title for a meaningful response
      const book = await Book.findById(req.body.list, "title");
      const bookTitle = book ? book.title : "Unknown Book";

      res.status(200).json({
        success: true,
        message: `Successfully added ${bookTitle} to list`,
        data: updatedUser.list, // Return the populated list
      });
      return;
    }

    // Populate the list even if no new item is added
    const populatedUser = await User.findById(user.id).populate("list");

    res.status(400).json({
      success: false,
      message: "No list item provided",
      data: populatedUser.list, // Return the populated list
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const removeFromList = async (req, res) => {
  try {
   user = await User.findById(req.params.id);
    // Check if a list item is provided
    if (req.body.list) {
      // Update the list using $pull and fetch the updated user document
      const updatedUser = await User.findByIdAndUpdate(
        user.id,
        { $pull: { list: req.body.list } },
        { new: true } // Return the updated user document
      ).populate("list"); // Populate the list with Book details

      // Fetch the book title for a meaningful response
      const book = await Book.findById(req.body.list, "title");
      const bookTitle = book ? book.title : "Unknown Book";

      res.status(200).json({
        success: true,
        message: `Successfully removed ${bookTitle} from list`,
        data: updatedUser.list, // Return the populated list
      });
      return;
    }

    // Populate the list even if no new item is removed
    const populatedUser = await User.findById(user.id).populate("list");

    res.status(400).json({
      success: false,
      message: "No list item provided",
      data: populatedUser.list, // Return the populated list
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


module.exports={
  getUser,createUser,login,deleteUser,editUser,getList,addToList,removeFromList
}