const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },

  dailyExp: {
    type: Number,
    default: 0,
    trim: true,
  },
  weeklyExp: {
    type: Number,
    default: 0,
    trim: true,
  },
  monthlyExp: {
    type: Number,
    default: 0,
    trim: true,
  },
  yearlyExp: {
    type: Number,
    default: 0,
    trim: true,
  },
  suspended: {
    type: Boolean,
    default: false,
  },
});

userSchema.statics.findByCredentials = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error(`User does not exist`);
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new Error(`User does not exist`);
  return user;
};

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

userSchema.pre("save", async function () {
  const user = this;
  if (user.isModified("password"))
    user.password = await bcrypt.hash(this.password, 8);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
