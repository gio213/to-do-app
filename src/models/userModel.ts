import moongose from "mongoose";

const userSchema = new moongose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },

  isVerifed: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpire: Date,
  verifayToken: String,
  verifayTokenExpire: String,
});
const User = moongose.models.users || moongose.model("users", userSchema);

export default User;
