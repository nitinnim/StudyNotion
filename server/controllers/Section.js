const Section = require("../models/Section");
const Course = require("../models/Course");
const SubSection = require("../models/SubSection");

// create section
exports.createSection = async (req, res) => {

    try{

        // fetch data
        const {sectionName, courseId} = req.body;

        // validation
        if(!sectionName || !courseId){
            return res.status(402).json({
                success: false,
                message: "All Fields are required"
            })
        }

        // create entry of section in DB
        const newSection = await Section.create({sectionName});

        // add section in course
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            {
                $push: {
                    courseContent: newSection._id,
                }
            },
            {new: true},
        )
        .populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        })
        .exec();

        // return response
        return res.status(200).json({
            success: true,
            message: "Section Added Successfully",
            data: newSection,
            updatedCourse
        })

    }
    catch(err){
        console.log("Error in creating section -> " + err.message);
        return res.status(500).json({
            success: false,
            message: "Issue in Creating the section",
        })
    }

}

// update section
exports.updateSection = async (req, res) => {

    try{

        // get data
        const {sectionName, sectionId, courseId} = req.body;

        // update in section DB
        const updatedSections = await Section.findByIdAndUpdate(
            sectionId,
            {sectionName},
            {new: true},
        )

        // update course
        const course = await Course.findById(courseId)
        .populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        })
        .exec();

        // return response
        return res.status(200).json({
            success: true,
			message: updatedSections,
			data:course,
        })

    }
    catch(err){
        console.log("Error in updating section -> " + err.message);
        return res.status(500).json({
            success: false,
            message: "Issue in Updating the section",
        })
    }

}

// delete section
exports.deleteSection = async (req, res) => {
    try{

        // fetch data
        const {sectionId, courseId} = req.body;

        // delete section from Course DB
        await Course.findByIdAndUpdate(
            courseId,
            {
                $pull: {courseContent: sectionId}
            },
        )

        const section = await Section.findById(sectionId);
        // console.log(sectionId, courseId);
        if(!section){
            return res.status(404).json({
                success: false,
                message: 'Section not found'
            })
        }

        // delete sub section
        await SubSection.deleteMany({_id: {$in: section.subSection}})

        // delete section
        await Section.findByIdAndDelete(sectionId);

        // find and update the course and return
        const course = await Course.findById(courseId).populate({
            path: "courseContent",
            populate: {
                path: "subSection"
            }
        })
        .exec();

        // return response
        return res.status(200).json({
            success: true,
            message: "Section Deleted Successfully",
            data: course
        })
    }
    catch(err){
        console.log("Error in deleting section -> " + err.message);
        return res.status(500).json({
            success: false,
            message: "Issue in Deleting the section",
        })
    }

}