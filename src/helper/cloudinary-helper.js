
const cloudinary = require('../config/cloudinary');


const uploadImage = async (filePath) =>{
    try{

        const result = await cloudinary.uploader.upload(filePath);
        return {
            url : result.secure_url,
            public_id : result.public_id,
        }
    }catch(error){
       console.error("Error uploading image to Cloudinary:", error);
        throw error;

    }
}

module.exports = {
    uploadImage,
}