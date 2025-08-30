import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const UserModel = new mongoose.Schema({
    name :{
        type :String,
        required:true,
        trim : true
    },
    password :{
        type :String,
        required:true,
        minLength : 6
    },
    email :{
         type :String,
        required:true,
        unique : true,
        match :[/.+\@.+\..+/,"Please Enter vaild email address"],
        trim : true,
    },
    role :{
        type : String,
        enum:['customer','admin'],
        default :"customer"
    }
},{timestamps:true})

UserModel.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})
UserModel.methods.matchPassword = async function (enterPassword){
    return await bcrypt.compare(enterPassword,this.password)
}
const User = mongoose.model("user",UserModel);
export default User