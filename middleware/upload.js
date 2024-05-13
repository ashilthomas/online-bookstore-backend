import multer from "multer";
let filename = ''

const storage = multer.diskStorage({
    destination: function (req, image, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, image, cb) {
        filename = image.originalname
   
      cb(null, Date.now() + '-'+ filename)
    }
  })
  
  const upload = multer({ storage: storage })

  export {upload}