const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// User Schema and Model
const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', UserSchema);

// Token Schema and Model
const TokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    }
});

const Token = mongoose.model('Token', TokenSchema);

// Post Schema and Model
const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  categories: {
    type: String,
    required: true
  },
  createDate: {
    type: Date,
    default: Date.now // Automatically set the create date
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

const Post = mongoose.model('Post', PostSchema);


//Comment Schema 

const CommentSchema=mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  postId:{
    type:String,
    required:true
  },
  date:{
    type:Date,
    required:true
  },
  comments:{
    type:String,
    required:true
  }
});
const Comment=mongoose.model("Comment",CommentSchema)
// Export Models
module.exports = { User, Token, Post , Comment };
