const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.pre(
  'save',
  async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  },
);

UserSchema.methods.isValidPassword = async function (password) {
  const compare = await bcrypt.compare(password, this.password);
  return compare;
};

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;
