const {instance}  = require('../config/razorpay');
const { courseEnrollmentEmail } = require('../mail/templates/courseEnrollmentEmail');
const Course = require('../models/Course');
const User = require('../models/User');
const mailSender = require('../utils/mailSender');
const { default: mongoose } = require("mongoose");
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail");
const crypto = require("crypto");
const CourseProgress = require('../models/CourseProgress');

// capture the payment and initiate the Razorpay order
exports.capturePayment = async (req, res) => {

    const {courses} = req.body;
    const {userId} = req.user.id;

    if(courses.length === 0) {
        return res.json({status: false, message: 'Please Provide the Course Id'})
    }

    let totalAmount = 0;
    for(const course_id of courses) {
        let course;
        try{
            course = await Course.findById(course_id);
            if(!course){
                return res.status(200).json({success: false, message: "Could not find the course"})
            }

            const uid = new mongoose.Types.ObjectId(userId);
            if(course.studentsEnrolled.includes(uid)) {
                return res.status(200).json({success: false, message: "User Already enrolled in the course"})
            }

            totalAmount += course.price;

        }
        catch(err){
            console.log(err);
            return res.status(500).json({success: false, message: err.message})
        }
    }

    const options ={
        amount: totalAmount*100,
        currency: "INR",
        receipt: Math.random(Date.now()).toString(),
    }

    try{
        const paymentResponse = await instance.orders.create(options);
        res.status(200).json({
            success: true,
            message: paymentResponse,
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({success: false, message: "Could not initiate the order"})
    }

}

// verify the payment
exports.verifyPayment = async(req, res) => {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;

    if(!razorpay_order_id || !razorpay_payment_id || !courses || !userId || !razorpay_signature) {
        return res.status(200).json({success: false, message: "Payment Failed"})
    }
    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");
    if(expectedSignature == razorpay_signature){
        // enroll the student in the course
        await enrollStudent(courses, userId, res);
        // return response
        return res.status(200).json({success: true, message: "Payment Verified"})
    }
    return res.status(200).json({success: false, message: "payment Failed"})

}

const enrollStudent = async (courses, userId, res) => {

    if(!courses || !userId){
        return res.status(400).json({success: false, message: "Please Provide all data"})
    }

    for(const courseId of courses) {
        try {
            const updatedCourse = await Course.findOneAndUpdate(
                {_id: courseId},
                {$push: {studentsEnrolled: userId}},
                {new: true},
            )
    
            if(!updatedCourse){
                return res.status(500).json({success: false, message: "Could not found course"})
            }

            const courseProgress = await CourseProgress.create({
                courseID: courseId,
                userId: userId,
                completedVideos: []
            })
            
            // find the student and add course 
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                {$push: {
                        courses: courseId,
                        courseProgress: courseProgress._id,
                }},{new: true})
            // console.log("payment courseProgress - ", updatedUser)
            
            // send the mail to the user
            const emailResponse = await mailSender(
                updatedUser.email,
                `Successfully Enrolled into ${updatedCourse.courseName}`,
                courseEnrollmentEmail(updatedCourse.courseName, `${updatedUser.firstName}`)
            )
            console.log("Mail Response - ", emailResponse);    
        } catch (error) {
            console.log(error)
            return res.status(500).json({success: false, message: error.message})
        }
    }

}

exports.sendPaymentSuccessEmail = async(req, res) => {
    const {orderId, paymentId, amount} = req.body;
    const userId = req.user.id;

    if(!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({success: false, message: "Please Provide all the fields"})
    }

    try{
        const enrolledStudent = await User.findById(userId);
        await mailSender(
            enrolledStudent.email,
            `Payment Recieved`,
            paymentSuccessEmail(`${enrolledStudent.firstName}`, amount/100, orderId, paymentId)
        )
    }
    catch(err){
        console.log('error in sending the payment success mail - ', err)
        return res.status(500).json({success: false, message: "COuld not send the mail"})
    }

}

// ---> ALL THIS CODE IS ONLY USEFUL FOR SINGLE ITEM PURCHASE BUT WE WANT THE MULTIPLE ITEMS TO BE PURCHASED <---
// capture the payment and initiate the Razorpay order
// exports.capturePayment = async (req, res) => {

//     try{

//         // get courseId and userId
//         const {courseId} = req.body;
//         const userId = req.user.id;

//         // validation
//         if(!courseId || !userId){
//             return res.status(400).json({
//                 success: false,
//                 message: "All Fields are required"
//             })
//         }

//         // validate courseDetail
//         try{
//             let courseDetails = await Course.findById(courseId);
//             if(!courseDetails){
//                 return res.status(404).json({
//                     success: false,
//                     message: "Could not find the course"
//                 })
//             }

//             // is user already enrolled in the same course ?
//             const uid = new mongoose.Types.ObjectId(userId);
//             if(courseDetails.studentsEnrolled.includes(uid)) {
//                 return res.status(200).json({
//                     success: true,
//                     message: "You are already enrolled in this course"
//                 })
//             }

//         }
//         catch(error){
//             console.log("Error in finding the course -> ", error);
//             return res.status(404).json({
//                 success: false,
//                 message: "Catch in finding the course"
//             })
//         }
        
//         // order create (razorpay integration step can see in documentation)
//         const amount = courseDetails.price;
//         const currency = "INR";

//         const options = {
//             // mandatory paramenter
//             amount: amount * 100, //always give amount*100 according to razorpay documentation
//             currency,
            
//             // optional parameteres
//             receipt: Math.random(Date.now()).toString(),
//             notes: {
//                 courseId: courseId,
//                 userId,
//             }
//         }
//         try{
//             // initiate the payment using razorpay
//             const paymentResponse = await instance.orders.create(options); //mandatory function call to create order
//             console.log("PaymentResponse -> " + paymentResponse);

//             res.status(200).json({
//                 success: true,
//                 coursename: courseDetails.courseName,
//                 courseDescription: courseDetails.courseDescription,
//                 thumbnail: courseDetails.thumbnail,
//                 orderId: paymentResponse.id,
//                 currency: paymentResponse.currency,
//                 amount: paymentResponse.amount,
//             })

//         }
//         catch(err){
//             console.log(err);
//             res.json({
//                 success: false,
//                 message: "Could not initate the payment"
//             })
//         }

//     }
//     catch(err){
//         console.log(err);
//         res.json({
//             success: false,
//             message: "Error in razorpay payment integration system"
//         })
//     }

// }

// // verify signature of razorpay and server
// exports.verifySignature = async (req, res) => {

//     // server secret which stored in our backend
//     const webhookSecret = "12345678";

//     // secret which stored in razorpay account gives with web-hook api call (In Encrypted Form)
//     const signature = req.headers["x-razorpay-signature"];

//     // to match both the secret-keys we have to convert the server secret-key into encrypted form using same 3 steps through which razorpay encrypted its secret key
//     const shasum = crypto.createHmac("sha256", webhookSecret);
//     shasum.update(JSON.stringify(req.body));
//     const digest = shasum.digest("hex");

//     if(signature === digest) {
//         console.log("Payment is Authorised");

//         // after payment completed successfully we have to do things like adding course in user model and adding user in course model
        
//         // because this route(verify-signature) is called by razorpay it is not coming from frontend so we cannot normally get courseId and userId from body or parameter

//         const {courseId, userId} = req.body.payload.payment.entity.notes;//we need this details here, that's why we put this info inside notes in response 

//         try{
//             // update course
//             const enrolledUser = await Course.findOneAndUpdate(
//                 {_id: courseId},
//                 {
//                     $push: {
//                         studentsEnrolled: userId,
//                     }
//                 },
//                 {new: true}
//             )
//             if(!enrolledUser){
//                 res.json({
//                     success: false,
//                     message: "Course not found"
//                 })
//             }
//             console.log("enrolledUser -> " + enrolledUser);

//             // update user
//             const enrolledCourse = await User.findOneAndUpdate(
//                 {_id: userId},
//                 {
//                     $push: {
//                         courses: courseId,
//                     }
//                 },
//                 {new: true}
//             )
//             console.log("enrolledCourse -> " + enrolledCourse)

//             // send mail
//             const emailResponse = await mailSender(enrolledCourse.email, "Congratulation", courseEnrollmentEmail(enrolledUser.courseName,enrolledCourse.firstName))

//             // return response
//             return res.status(200).json({
//                 success: true,
//                 message: "successfully enrolled in course"
//             })
//         }
//         catch(err){
//             console.log(err);
//             res.json({
//                 success: false,
//                 message: "Cannot update course and user after the payment"
//             })
//         }


//     }
//     else{
//         return res.status(400).json({
//             success: false,
//             message: "Invalid request for buy course"
//         })
//     }


// }