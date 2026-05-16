
const cloudinary = require('../config/cloudinary');
const asyncHandler = require("../utils/asyncHandler");

const uploadImage = asyncHandler(async (filePath) =>{
    

        const result = await cloudinary.uploader.upload(filePath);
        return {
            url : result.secure_url,
            public_id : result.public_id,
        }
  
});



module.exports = {
    uploadImage,
}

