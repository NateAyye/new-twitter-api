// username --

// String
// Unique
// Required
// Trimmed
// --

// email --

// String
// Required
// Unique
// Must match a valid email address (look into Mongoose's matching validation)
//  --
// thoughts
// Array of _id values referencing the Thought model

// friends
// Array of _id values referencing the User model (self-reference)

// Schema Settings:
// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
const { Schema, model } = require('mongoose');


const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const userSchema = new Schema({
  username: { type: String, unique: true, required: true, trim: true },
  email: { type: String, required: true, unique: true, match: [emailRegEx] },
  thoughts: [{ type: Schema.Types.ObjectId, ref: 'thought' }],
  friends: [{ type: Schema.Types.ObjectId, ref: 'user' }]

},{
  toJSON: {
    virtuals: true,
  }
})

userSchema.virtual('friendCount').get(() => this.friends.length); 

const User = model('user', userSchema);

module.exports = User;