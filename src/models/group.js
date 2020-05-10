const mongoose = require('mongoose');

const { Schema } = mongoose;

const GroupSchema = new Schema({
  owner_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  name: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        const patt = /^[a-z0-9_-]{3,15}$/gi;
        return value && patt.test(value);
      },
      message: (props) => `${props.value} is not a valid username`
    }
  },
  profile_pic: String,
  description: {
    type: String,
    validate: {
      validator: (value) => {
        return value && value.length < 255;
      },
      message: (props) => `Description must be less than 255 characters.`
    }
  },
  is_active: {
    type: Boolean,
    default: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  meta: Schema.Types.Mixed
});

const MessageModel = mongoose.model('Message', GroupSchema);
module.exports = MessageModel;
