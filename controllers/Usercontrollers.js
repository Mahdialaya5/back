const User = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

exports.Getusers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        return res.status(500).send({ msg: error.message })
    }
}

exports.RegisterUser = async (req, res) => {
    try {
        console.log('what')
        const { email } = req.body
       if (req.body.Role) {
            return res.status(401).send({ msg: 'Acces deined' })
        }
        const EmailExist = await User.findOne({ email })
        if (EmailExist) {
            return res.status(400).send({ msg: 'Email exist please login' })
        }
        const HashPassword = await bcrypt.hash(req.body.Password,10)
        const user = new User(req.body)
        user.Password = HashPassword
        await user.save()
        return res.status(201).send({ msg: 'User created' })
    } catch (error) {
        return res.status(500).send({ msg: error.message })
    }
}

exports.Login=async(req,res)=>{
  try {
  const {email,Password}=req.body
  const UserExist = await User.findOne({ email })
  if (!UserExist){
     return res.status(400).send({msg:"bad credential"})}

   const IsMatched= await bcrypt.compare(Password,UserExist.Password)
     if (!IsMatched){
        return res.status(400).send({msg:"bad credential"})
     }
     
    const payload = { _id: UserExist._id };
    const token = jwt.sign(payload, process.env.secretKey);

    return res.status(200).send({msg:'Login success',token,user:UserExist})

  } catch (error) {
    return res.status(500).send({ msg: error.message })
  }

}

exports.GetCurrent=(req,res)=>{
    res.status(200).send(req.user)
}


exports.Update = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findByIdAndUpdate(id, req.body, { new: true })

        return res.status(202).send(user)

    } catch (error) {
        return res.status(500).send({ msg: error.message })
    }
}

