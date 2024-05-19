const CourseProgress = require("../models/CourseProgress");
const SubSection = require("../models/SubSection");

exports.updateCourseProgress = async(req, res) => {
    
    const {courseId, subSectionId} = req.body;
    const userId =  req.user.id;

    try{
        // check if subsection is valid
        const subSection = await SubSection.findById(subSectionId);
        if(!subSection){
            return res.status(404).json({error: "Invalid SubSection"})
        }

        // check for old entry
        let courseProgress = await CourseProgress.findOne({
            courseID: courseId,
            userId: userId,
        })
        // console.log("updatecourseProgress - ", courseProgress)
        if(!courseProgress){
            return res.status(404).json({
                success: false,
                message: 'Course Progress does not exist'
            })
        }
        else{
            // check for re-completing the video
            if(courseProgress.completedVideos.includes(subSectionId)) {
                return res.status(400).json({
                    error: "Subsection already completed"
                })
            }

            // push into the completed video
            courseProgress.completedVideos.push(subSectionId);
        }
        await courseProgress.save();
        return res.status(200).json({
            success: true,
            message: "Lecture Completed"
        })
    }
    catch(err){
        console.error(err)
        return res.status(500).json({error: "Internal Server Error"})
    }

}