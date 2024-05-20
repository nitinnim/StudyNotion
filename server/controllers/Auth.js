const OTP = require('../models/OTP');
const User = require('../models/User');
const Profile = require('../models/Profile');

const otpGenerator = require('otp-generator');
const jwt = require('jsonwebtoken');
const mailSender = require("../utils/mailSender");
const bcrypt = require('bcryptjs');
const { passwordUpdated } = require("../mail/templates/passwordUpdate")
require("dotenv").config()

// send otp
exports.sendotp = async (req,res) => {
    try{
        // fetch email
        const {email} = req.body;

        // check if email already exists
        const checkUserPresent = await User.findOne({email:email});

        // if email is already present
        if(checkUserPresent){
            return res.status(401).json({
                success: false,
                message: 'Email already exists',
            })
        }

        // generate otp
        let otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        })
        // console.log("OTP -> " + otp);

        // unique otp
        let isOtpPresent = await OTP.findOne({otp: otp}) 

        while (isOtpPresent) {
			otp = otpGenerator.generate(6, {
				upperCaseAlphabets: false,
			});
		}
        // Store entry in DB
        const payload = {email, otp};
        const otpBody = await OTP.create({email, otp})
        // console.log("otpBody -> " , otpBody);

        // send response
        res.status(200).json({
            success: true,
            otp,
            message: 'OTP Sent Successfully',
        })

    }
    catch(err){
        console.log("Error in sendOtp - " + err);
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}

// sign up
exports.signup = async (req, res) => {
    try{

        // fetch data
        const {firstName, lastName, email, password, confirmPassword, accountType, otp} = req.body;

        // validate
        if(!firstName || !lastName  || !email || !password || !otp || !confirmPassword){
            return res.status(403).json({
                success: false,
                message: "Fill all the required information"
            })
        }

        // password and confirm password must be same
        if(password !== confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Check your password and try again"
            })
        }

        // check if email already exists
        const checkUserPresent = await User.findOne({email:email});

        // if email is already present
        if(checkUserPresent){
            return res.status(401).json({
                success: false,
                message: 'Email already exists',
            })
        }

        // find most recent otp for the user
        const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        // console.log("recentOtp -> " + recentOtp);

        // validate otp
        if(recentOtp.length == 0){
            // otp not found
            return res.status(400).json({
                success: false,
                message: 'Otp not found',
            })
        }else if(recentOtp[0].otp !== otp){
            // invalid otp
            return res.status(400).json({
                success: false,
                message: 'Invalid OTP ',
            })
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //  DB mein entry
        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        })
        const user = await User.create({
            firstName,
            lastName, 
            email, 
            password: hashedPassword, 
            accountType,
            // approved,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
            // this url gives us an image with the initials of individual
        })

        // return response
        return res.status(200).json({
            success: true,
            message: 'SugnUp Successfully',
            user,
        })

    }
    catch(err){
        console.log("Error in sign up -> " + err);
        return res.status(500).json({
            success: false,
            message: 'SugnUp is not completed',
        })

    }
}

// login
exports.login = async (req,res) => {

    try{

        // fetch data
        const {email, password} = req.body;

        // validation of data
        if(!email || !password){
            return res.status(403).json({
                success: false,
                message: 'All Fields are required, please try again',
            })
        }

        // check email exist or not
        let user = await User.findOne({email}).populate("additionalDetails");
        if(!user){
            return res.status(401).json({
                success: false,
                message: 'User Does Not Exist',
            })
        }

        // generate JWT, after password matching
        if(await bcrypt.compare(password, user.password)){

            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType,
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET,{
                expiresIn: "24h"
            })

            user.token = token;
            user.password = undefined;

            // create cookie and send in response
            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly: true,
            }

            return res.cookie("token", token, options).status(200).json({
                success: true,
                user,
                token,
                message: "Logged in Successfully"
            })
        }
        else{
            return res.status(401).json({
                success: false,
                message: "Password is Incorrect"
            })
        }

    }
    catch(err){
        console.log("Error in Login", err);
        return res.status(500).json({
            success: false,
            message: "Login failed, please try again later"
        })
    }

}

// change password
exports.changePassword = async (req, res) => {
	try {
		// Get user data from req.user
		const userDetails = await User.findById(req.user.id);

		// Get old password, new password, and confirm new password from req.body
		const { oldPassword, newPassword } = req.body;

		// Validate old password
		const isPasswordMatch = await bcrypt.compare(
			oldPassword,
			userDetails.password
		);
		if (!isPasswordMatch) {
			// If old password does not match, return a 401 (Unauthorized) error
			return res
				.status(401)
				.json({ success: false, message: "The password is incorrect" });
		}

		// Match new password and confirm new password
		// if (newPassword !== confirmNewPassword) {
		// 	// If new password and confirm new password do not match, return a 400 (Bad Request) error
		// 	return res.status(400).json({
		// 		success: false,
		// 		message: "The password and confirm password does not match",
		// 	});
		// }

		// Update password
		const encryptedPassword = await bcrypt.hash(newPassword, 10);
		const updatedUserDetails = await User.findByIdAndUpdate(
			req.user.id,
			{ password: encryptedPassword },
			{ new: true }
		);

		// Send notification email
		try {
			const emailResponse = await mailSender(
				updatedUserDetails.email,
                "Password for your account has been updated",
				passwordUpdated(
					updatedUserDetails.email,
					`Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
				)
			);
			// console.log("Email sent successfully:", emailResponse.response);
		} catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}

		// Return success response
		return res
			.status(200)
			.json({ success: true, message: "Password updated successfully" });
	} catch (error) {
		// If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
	}
};