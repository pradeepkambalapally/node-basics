const cloudinary = require('../config/cloudinary');
const { uploadImage } = require('../helper/cloudinary-helper');


const Image = require('../models/image');

const uploadImageController = async (req, res) => {
    try{
        if(!req.file){
            return res.status(400).json({
                message : "No file uploaded",
                success : false,
            })  
        }
        const {url , public_id} = await uploadImage(req.file.path);
        const newImage = new Image({
            url,
            public_id,
            uploadedBy : req.user.id
        })
        await newImage.save();
        res.status(200).json({
            message : "Image uploaded successfully",
            success : true,
            data : newImage
        })
    }catch(e){
    console.error(e);
    return res.status(500).json({
        message : "Error uploading image",
        error: e.message,
        success : false,
    })
}
}

module.exports = {
    uploadImageController,
}