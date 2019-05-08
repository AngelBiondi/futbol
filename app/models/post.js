const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PostSchema = new Schema({
  text: String,
  image:String,
  title:String,
  postedBy:Schema.Types.ObjectId
})

const POSTT = mongoose.model('Post', PostSchema)

module.exports = POSTT;

