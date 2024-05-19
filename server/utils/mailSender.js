const nodemailer = require('nodemailer');

const mailSender = async (email, title, body) => {
    // console.log(email, title, body);
    try{

        // create transporter
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth:{
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        })

        // send mail
        const info = await transporter.sendMail({
            from: "STUDY-NOTION",
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
        })
        // console.log("Info -> ",info);
        return info;
    }
    catch(err){
        console.log("Error in mailSender -> ", err);
    }

}

module.exports = mailSender;