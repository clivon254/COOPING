
import mongoose from"mongoose"

const userSchema = new mongoose.Schema(
    {
        username:{type:String ,required:true},

        email:{type:String ,required:true },

        // phone:{type:String ,required:true},

        isAdmin:{type:Boolean , default:false},

        password:{type:String , required:true},

        role:{type:String , default:"user" },

        profilePicture:{type:String , default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"},

        failedLoginAttempts:{type:Number , default:0},

        lastFailedLogin:{type:Date},

        isBanned:{type:Boolean ,default:false},

        cartData:{type:Object ,default:{}}
    },
    {timestamps:true}
)


export const User = mongoose.model('User', userSchema)


export default User