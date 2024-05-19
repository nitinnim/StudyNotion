const SubSection = require('../models/SubSection');
const Section = require('../models/Section');

const {uploadImageOnCloudinary} = require('../utils/imageUploader');
require("dotenv").config();

exports.createSubSection = async (req, res) => {

    try{

        // fetch data
        const {sectionId, title, description} = req.body;

        // fetch video file
        const file = req.files.video;

        // validation
        if(!title || !description || !file || !sectionId){
            return res.status(404).json({
                success: false,
                message: 'All Fields Are Required'
            })
        }

        // upload video on cloudinary
        const videoUrl = await uploadImageOnCloudinary(file, process.env.FOLDER_NAME);

        // create an entry in SubSection DB
        const updatedSubSection = await SubSection.create({
            title: title,
            timeDuration: `${videoUrl.duration}`,
            description: description,
            videoUrl: videoUrl.secure_url,
        })

        // update Section by adding SubSection
        const updatedSection = await Section.findByIdAndUpdate(
            {_id: sectionId},
            {
                $push: {
                    subSection: updatedSubSection._id,
                }
            },
            {new: true}
        ).populate("subSection");

        // return response
        return res.status(200).json({
            success: true,
            data: updatedSection,
            message: "Sub-Section Created Successfully"
        })

    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: "Cannot create subsection, please try again"
        })
    }

}

exports.updateSubSection = async (req, res) => {
    try {
      const { sectionId,subSectionId, title, description } = req.body
      const subSection = await SubSection.findById(subSectionId)
  
      if (!subSection) {
        return res.status(404).json({
          success: false,
          message: "SubSection not found",
        })
      }
  
      if (title !== undefined) {
        subSection.title = title
      }
  
      if (description !== undefined) {
        subSection.description = description
      }
      if (req.files && req.files.video !== undefined) {
        const video = req.files.video
        const uploadDetails = await uploadImageOnCloudinary(
          video,
          process.env.FOLDER_NAME
        )
        subSection.videoUrl = uploadDetails.secure_url
        subSection.timeDuration = `${uploadDetails.duration}`
      }
  
      await subSection.save()
  
      const updatedSection = await Section.findById(sectionId).populate("subSection")

      return res.json({
        success: true,
        data:updatedSection,
        message: "Section updated successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while updating the section",
      })
    }
}

exports.deleteSubSection = async (req, res) => {

    try{

        // fetch data
        const {subSectionId, sectionId} = req.body;

        // delete sub-section from Section DB
        await Section.findByIdAndUpdate(
            sectionId,
            {
                $pull: {subSection: subSectionId}
            },
            {new: true}
        )

        // delete sub-section from Sub-Section DB
        const subSection = await SubSection.findByIdAndDelete(subSectionId);
        if (!subSection) {
            return res
              .status(404)
              .json({ success: false, message: "SubSection not found" })
        }

        const updatedSection = await Section.findById(sectionId).populate("subSection")
        // return response
        return res.status(200).json({
            success: true,
            data: updatedSection,
            message: "Sub-Section Deleted Successfully",
        })
    }
    catch(err){
        console.log("Error in deleting sub-section -> " + err.message);
        return res.status(500).json({
            success: false,
            message: "Issue in Deleting the sub-section",
        })
    }

}