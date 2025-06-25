import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

const User = mongoose.model('User',userSchema)

const imageSchema = new mongoose.Schema({
  image:{data:Buffer,
    contentType:String
  },
  category:{type:String}
})

const Img = mongoose.model("Img",imageSchema)

const logoSchema = new mongoose.Schema({
  image:{data:Buffer,
    contentType:String
  }
})

const Logo = mongoose.model("Logo",logoSchema)



export {User,Img,Logo}