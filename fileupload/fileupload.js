const multer = require("multer");


const storage = multer.diskStorage({
    destination : (req, file, cb)=>{
        cb(null, './upload')
    },
    filename:(req, file, cb)=>{
        cb(null, Date.now()+file.originalname)
    }
})

const filter = (req, file, cb)=>{
    if(file.mimetype == "image/jpeg" ||  file.mimetype == "image/gif"){
        cb(null, true)
    }else{
        cb(null, false)
    }
}



const upload = multer({
    storage: storage,
    fileFilter : filter
})

module.exports = upload;