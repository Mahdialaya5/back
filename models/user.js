const mongoose=require('mongoose')

const userSchema= new mongoose.Schema({
   email:{type:String,require:true,unique:true},
   Name:{type:String},
   Password:{type:String,require:true},
   Role:{type:String,enum:['admin','client'],default:'client'}
},
{ timestamps: true })
const User=mongoose.model('user',userSchema)
module.exports=User