const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema({
  thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
  createdAt: {
    type: Date, default: Date.now, get: (timestamp) => new Date(timestamp).toLocaleDateString('en-US', {
      dateStyle: 'medium'
    })
  },
  username: { type: String, required: true },
  reactions: [reactionSchema]

}, {
  toJSON: {
    virtuals: true,
    getters: true
  }
})

thoughtSchema.virtual('reactionCount').get(() => this.reactions?.length || 0);

const Thought = model('thought', thoughtSchema);

module.exports = Thought;