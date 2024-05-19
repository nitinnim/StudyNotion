const Profile = require("../models/Profile");
const Course = require("../models/Course");
const User = require("../models/User");
const CourseProgress = require("../models/CourseProgress");
const { uploadImageOnCloudinary } = require("../utils/imageUploader");
const { convertSecondsToDuration } = require("../utils/secToDuration");
const { default: mongoose } = require("mongoose");

exports.updateProfile = async (req, res) => {
  try {
    // fetch data
    const { firstName = "", lastName = "", gender = "", dateOfBirth = "", about = "", contactNumber = ""} = req.body;

    // get userId
    const userId = req.user.id;
    // console.log("userid -> " + userId);
    // validation
    if (!userId) {
      return res.status(402).json({
        success: false,
        message: "Invalid user",
      });
    }

    // find profile
    const userDetails = await User.findById(userId);
    const profileDetails = await Profile.findById(
      userDetails.additionalDetails
    );

    
    const user = await User.findByIdAndUpdate(userId, {
      firstName,
      lastName,
    },{new:true})
    await user.save()

    // update profile (we are using save method because we have already created a profile object)
    profileDetails.gender = gender;
    profileDetails.dateOfBirth = dateOfBirth;
    profileDetails.contactNumber = contactNumber;
    profileDetails.about = about;
    await profileDetails.save();

    const updatedUserDetails = await User.findById(userId)
    .populate("additionalDetails")
    .exec()

    // return response
    return res.status(200).json({
      success: true,
      updatedUserDetails,
      message: "Profile updated successfully",
    });
  } catch (err) {
    console.log("Error in updating the profile", err);
    return res.status(500).json({
      success: false,
      message: "Can not update profile",
    });
  }
};

// delete user
exports.deleteAccount = async (req, res) => {
  try {
    // fetch id
    const userId = req.user.id;
    const userDetails = await User.findById({ _id: userId });

    // validation
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "Invalid user",
      });
    }

    // delete profile first
    await Profile.findByIdAndDelete({ _id:new mongoose.Types.ObjectId(userDetails.additionalDetails) });
    for (const courseId of userDetails.courses) {
      await Course.findByIdAndUpdate(
        courseId,
        { $pull: { studentsEnrolled: userId } },
        { new: true }
      )
    }

    // delete user
    await User.findByIdAndDelete({ _id: userId });
    await CourseProgress.deleteMany({ userId: userId })

    // return response
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (err) {
    console.log("Error in deleting the user - ", err);
    return res.status(500).json({
      success: false,
      message: "Can not delete account, try again later",
    });
  }
};

exports.getAllUserDetails = async (req, res) => {
  try {
    const id = req.user.id;
    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();
    console.log(userDetails);
    res.status(200).json({
      success: true,
      message: "User Data fetched successfully",
      data: userDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateDisplayPicture = async (req, res) => {
  try {
    // console.log("inside controller 1");
    const displayPicture = req.files.displayPicture;
    const userId = req.user.id;
    const image = await uploadImageOnCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    );
    // console.log(image);
    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    )
    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    });
    // console.log("inside controller 2");
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;
    let userDetails = await User.findOne({
      _id: userId,
    })
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      })
      .exec();

    userDetails = userDetails.toObject();
    var SubsectionLength = 0;
    for (var i = 0; i < userDetails.courses.length; i++) {
      let totalDurationInSeconds = 0;
      SubsectionLength = 0;
      for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
        totalDurationInSeconds += userDetails.courses[i].courseContent[
          j
        ].subSection.reduce(
          (acc, curr) => acc + parseInt(curr.timeDuration),
          0
        );
        userDetails.courses[i].totalDuration = convertSecondsToDuration(
          totalDurationInSeconds
        );
        SubsectionLength +=
          userDetails.courses[i].courseContent[j].subSection.length;
      }
      let courseProgressCount = await CourseProgress.findOne({
        courseID: userDetails.courses[i]._id,
        userId: userId,
      });
      courseProgressCount = courseProgressCount?.completedVideos.length;
      if (SubsectionLength === 0) {
        userDetails.courses[i].progressPercentage = 100;
      } else {
        // To make it up to 2 decimal point
        const multiplier = Math.pow(10, 2);
        userDetails.courses[i].progressPercentage =
          Math.round(
            (courseProgressCount / SubsectionLength) * 100 * multiplier
          ) / multiplier;
      }
    }

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      });
    }
    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.instructorDashboard = async (req, res) => {
  try {
    const courseDetails = await Course.find({ instructor: req.user.id });

    const courseData = courseDetails.map((course, ind) => {
      const totalStudentsEnrolled = course.studentsEnrolled.length;
      const totalAmountGenerated = totalStudentsEnrolled * course.price;

      const courseDataWithStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        totalStudentsEnrolled,
        totalAmountGenerated,
      };
      return courseDataWithStats;
    });
    return res.status(200).json({ success: true, data: courseData });
  } catch (error) {
    console.log("Error in instructor dashboard - ", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
