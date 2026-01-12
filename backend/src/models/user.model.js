import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 50,
    }
  },
  
  {
    timestamps: true
  }
)


// before hash
userSchema.pre("save", async function(next){
  if(!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next
});

//compare password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
}

export const User = mongoose.model("User", userSchema);
