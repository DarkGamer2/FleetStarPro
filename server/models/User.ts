import mongoose from 'mongoose';
import {Schema} from 'mongoose';

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  vehicles: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Vehicle',
    },
  ],
});

const User = mongoose.model('User', userSchema);

export default User;
