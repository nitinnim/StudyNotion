const RatingAndReview = require('../models/RatingAndReview');
const Course = require('../models/Course');

// create rating
exports.createRating = async (req, res) => {
    try{
        // fetch data
        console.log("1");
        const userId = req.user.id;
        const {rating, review, courseId} = req.body;

        // validation
        if(!userId || !courseId){
            return res.status(403).json({
                success: false,
                message: "Neccessary data is missing. Please try again"
            })
        }

        // check ki jo user rating and review de rha hai vo course mein enrolled hi hai yaa nhi 
        const courseDetails = await Course.findById({_id: courseId});
        if(!courseDetails.studentsEnrolled.includes(userId)){
            return res.status(403).json({
                success: false,
                message: "You have to enroll in course to give rating and review"
            })
        }
        console.log("2");

        // user sirf ek hi br rate and review kr skta hai
        const alreadyReviewed = await RatingAndReview.findOne({
            user: userId,
            course: courseId,
        })

        if(alreadyReviewed){
            return res.status(403).json({
                success: false,
                message: "You have already reviewed this course"
            })
        }

        // create entry in RatingAndReview DB
        const newRatingAndReview = await RatingAndReview.create({
            user: userId,
            rating: rating,
            review: review,
            course: courseId,
        })
        console.log("3");

        // update course model
        const updateCourse = await Course.findByIdAndUpdate(
            {_id: courseId},
            {
                $push: {
                    ratingAndReview: newRatingAndReview._id,
                }
            },
            {new: true}
        );
        console.log("4");

        // return response
        return res.status(200).json({
            success: true,
            data: newRatingAndReview,
            message: "Successfully created rating and review"
        })

    }
    catch(err){
        console.log("error in creating rating and review -> ",err);
        return res.status(500).json({
            success: false,
            message: "Problem in creating rating and review"
        })

    }
}

// get average rating
exports.getAverageRating = async (req, res) => {
    try{
        // fetch data
        const courseId = req.params.courseId;

        // calculate average rating
        const result = await RatingAndReview.aggregate([
            {
                $match: {
                    course: new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: "$rating" },
                },
            },
        ])
        console.log("Result of avg -> "+result);

        // return rating
        if(result.length > 0){
            return res.status(200).json({
                success: true,
                averageRating: result[0].averageRating,
            })
        }

        // if no rating/review exist
        return res.status(200).json({
            success: true,
            message: "Average rating is 0, no ratings till now",
            averageRating: 0,
        })
        
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: "Issue in getting the averating rating",
        })
    }
}

// get all rating and review 
exports.getAllRating = async (req, res) => {
    try{
        const allReviews = await RatingAndReview.find({})
                                            .sort({rating: "desc"})
                                            .populate({
                                                path: "user",
                                                select: "firstName lastName email image"
                                            })
                                            .populate({
                                                path: "course",
                                                select: "courseName"
                                            })
                                            .exec();
        return res.status(200).json({
            success: true,
            data: allReviews,
            message: "Fetched all ratings successfully"
        })

    }
    catch(err){
        console.log("Error in gerrting the ratings -> " + err.message);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch rating and reviews"
        })
    }
}

// get all ratings and reviews course specific
exports.getAllRatingAndReviewCourseSpecific = async (req, res) => {
    try{

        // fetch data
        const courseId = req.params.courseId;

        // get all review from DB
        const allReviews = await RatingAndReview.find({course: courseId})
                                            .populate(
                                                {
                                                    path: "user",
                                                    select: "firstName lastName email image"
                                                }
                                            )
                                            .populate({
                                                path: "course",
                                                select: "courseName"
                                            })
                                            .exec();
        return res.status(200).json({
            success: true,
            allReviews,
            message: "Fetched all ratings successfully"
        })  
    }
    catch(err){
        console.log("Error in gerrting the ratings -> " + err.message);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch rating and reviews"
        })
    }
}