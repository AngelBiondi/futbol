const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CommentSchema = new Schema({
  text: String,
  commentedBy:Schema.Types.ObjectId,
  postId: Schema.Types.ObjectId
})

const CommentT = mongoose.model('Comment', CommentSchema)

module.exports = CommentT;

