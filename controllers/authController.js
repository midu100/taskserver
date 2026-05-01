const userSchema = require("../models/userSchema")
const { generateAccToken, generateRefreshToken } = require("../services/helpers")
const { isValidEmail, isValidPassword } = require("../services/regex")

const signUp = async(req,res)=>{
    try {
        const{fullName,email,password} = req.body
        if(!fullName) return res.status(400).send({message : 'Full Name is required'})
        if(!email) return res.status(400).send({message : 'emial is required'})
            if(!isValidEmail(email)) return res.status(400).send({message : 'Invalid Email Address.'})
        if(!password) return res.status(400).send({message : 'Password is required'})
            if(!isValidPassword(password)) return res.status(400).send({message : 'Please choose Strong password.'})

        const existUser = await userSchema.findOne({email})
        if(existUser) return res.status(400).send({message : 'User already exist'})

        const userData = new userSchema({
            fullName,
            email,
            password
        })
        userData.save()

        res.status(201).send({message : 'Registration Complete.'})

        
    } 
    catch (error) {
      console.log(error)    
    }
}

const signIn = async (req,res)=>{
    try {
        const{email,password} = req.body

        if(!email) return res.status(400).send({message : 'Email is required'})
        if(!password) return res.status(400).send({message : 'Password is required'})

        const existUser = await userSchema.findOne({email})
        if(!existUser) return res.status(400).send({message : 'User Not Registered'})
      

        const matchedPass = await existUser.comparePassword(password)
        if(!matchedPass) return res.status(400).send({message : 'Incorrect password'})

        const accToken = generateAccToken(existUser)
        const refToken = generateRefreshToken(existUser)
        
        res.cookie('X_AS-TOKEN',accToken)
        res.cookie('R_FS-TOKEN',refToken)

        res.status(200).send({message : 'Login Successful.'})


    } 
    
    catch (error) {
      console.log(error)    
    }
}

const getUserProfile = async(req,res)=>{
    try {
        const user = await userSchema.findByIdAndUpdate(req.user._id).select('-password')
        if(!user) return res.status(400).send({message : 'Invalid request'})

        res.status(200).send({message : 'Successful' , user})
    } 
    catch (error) {
      console.log(error)    
    }
}

module.exports ={signUp,signIn,getUserProfile}