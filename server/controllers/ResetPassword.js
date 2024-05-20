const User = require('../models/User');
const mailSender = require('../utils/mailSender');
const crypto = require('crypto');
const bcrypt = require('bcryptjs')

// Reset-Password-Token (First)
exports.resetPasswordToken = async (req,res) => {

    try{

        // get email from request
        const {email} = req.body;

        // check user for this email, email validation
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success: false,
                message: 'User is not Registered',
            })
        }

        // generate token
        const token = crypto.randomBytes(20).toString("hex");

        // update user by adding token and expiration time
        const updatedUser = await User.findOneAndUpdate(
                                                    {email: email},
                                                    {
                                                        token: token,
                                                        tokenExpiryTime: Date.now() + 3600000,
                                                    },
                                                    {new: true});
        // create url (Frontend Url for reseting password page)
        const url = `http://localhost:3000/update-password/${token}`

        // send mail contaning the url
        await mailSender(email, "Password Reset Link", `Password Reset Link: ${url}` )

        // return response
        return res.status(200).json({
            success: true,
            user,
            message: "Password Reset Email sent successfully",
        })                                          

    }
    catch(err){
        console.log("Error in sending reseting email "+err);
        return res.status(500).json({
            success: false,
            message: "Some Problem Occur in Reseting Your Password now, Please Try Again Later",
        }) 
    }

}

// Reset-Password (Second)
exports.resetPassword = async (req,res) => {

    try{

        // fetch data
        const {token, password, confirmPassword} = req.body;

        // validation
        if(password !== confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Password is not matching",
            })
        }

        // get userdetails from DB using token
        const userDetails = await User.findOne({token: token});

        // if no entry - invalid token
        if(!userDetails){
            return res.status(400).json({
                success: false,
                message: "Token is Invalid",
            })
        }

        // token time check
        if(Date.now() > userDetails.tokenExpiryTime){
            return res.status(400).json({
                success: false,
                message: "Token is Expired",
            })
        }

        // hash password
        const hashPassword = await bcrypt.hash(password, 10);

        // password update
        await User.findOneAndUpdate(
            {token: token},
            {password: hashPassword},
            {new: true},
        )

        // return response
        return res.status(200).json({
            success: true,
            message: "Password Reseted Successfully",
        })
    }
    catch(err) {
        console.log("Error in reseting password -> " + err.message);
        return res.status(500).json({
            success: false,
            message: "Issue in Reseting password",
        })
    }

}
