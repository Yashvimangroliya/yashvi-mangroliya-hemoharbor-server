const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    role:{
        type:String,
        require:[true, 'role is required'],
        enum:['admin','organization','user','hospitl']
    },
    name:{
        type:String,
        require:function(){
            if(this.role === 'user' || this.role === 'admin'){
                return true
            }
            return false
        }
    },
    email:{
        type:String,
        require:[true, 'email is required'],
        unique:true
    },
    password:{
        type:String,
        require:[true, 'password is required'],
    },
    website:{
        type:String,
    },
    address:{
        type:String,
        require:[true, 'address is required'],
    },
    phone:{
        type:String,
        require:[true, 'phone number is required'],
    },
})