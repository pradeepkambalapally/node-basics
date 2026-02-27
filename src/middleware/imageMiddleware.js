
const cloudinary = require('../config/cloudinary');
const multer = require('multer');
const path = require('path');



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/images/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const fileFilter =  (req, file, cb) => {

  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
    cb(null, true)
  }else{
    cb(new Error('Unsupported file type. Only JPEG, PNG, and JPG are allowed.'), false)
  }
  
}

const uploadLimits = {
    fileSize: 1024 * 1024 * 5, // 5MB

}

const upload = multer({ storage: storage, fileFilter: fileFilter, limits: uploadLimits })

module.exports = {
    upload,

}