const { Router } = require('express')
const { uploadFile } = require('./controller')
const multer  = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../frontend/static/file/zip')
  },
  filename: function (req, file, cb) {
    const { originalname } = file
    cb(null, originalname)
  }
})
const upload = multer({ storage: storage })
console.log(upload)
const router = new Router();

// POST 
router.post('/:id', upload.single('zip'), uploadFile);

module.exports = router;