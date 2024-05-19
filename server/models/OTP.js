const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

const otpSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 60 * 5,
    }
});

// function to send email notification
async function sendVerificationEmail(email, otp) {
    try{
        const mailResponse = await mailSender(email, "Verification email", emailTemplate(otp));
        // console.log("Mail Response -> " + mailResponse.response);
    }
    catch(err){
        console.log("Error in sendVerificationEmail function -> " + err);
        throw err;
    }
}

// pre middleware
otpSchema.pre("save", async function(next) {
    await sendVerificationEmail(this.email, this.otp);
    next();
})
   
const OTP = mongoose.model("OTP", otpSchema);
module.exports = OTP;