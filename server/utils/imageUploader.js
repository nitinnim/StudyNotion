const cloudinary = require('cloudinary').v2;

exports.uploadImageOnCloudinary = async (file, folder, height, quality) => {
    try{

        const options = {folder};
        if(height){
            options.height = height;
        }
        if(quality){
            options.quality = quality;
        }
        options.resource_type = "auto";

        return await cloudinary.uploader.upload(file.tempFilePath, options)

    }
    catch(err){
        console.log("Error in uploading the file on cloudinary: " + err.message);
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}