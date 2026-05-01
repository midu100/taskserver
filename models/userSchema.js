// models/User.js

const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  const user = this;

  // Only hash if the password has been modified or is new
  if (!user.isModified("password")) return;

  try {
    user.password = await bcrypt.hash(user.password, 10);
  } catch (err) {
    console.log(err);
  }
});

// ========= compare password ==============
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);