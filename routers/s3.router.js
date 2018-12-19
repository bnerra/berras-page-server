let express = require('express')
let router = express.Router()
const multer = require('multer')
const upload = multer()

const awsWorker = require('../controllers/s3.controllers')

router.get('/api/s3', awsWorker.doDownload);

router.post('/api/email', upload.none(), awsWorker.sendEmail);

router.post('/api/data', upload.none(), awsWorker.getData);

module.exports = router;