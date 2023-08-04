
const { Schema } = require('mongoose');

export const reactionSchema = new Schema({
  reactionId: { type: Schema.Types.ObjectId, default: () => new Types.ObjectId() },
  reactionBody: { type: String, required: true, maxlength: 280 },
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, get: (timestamp) => new Date(timestamp).toLocaleDateString('en-US', { dateStyle: 'medium' }) }
})


