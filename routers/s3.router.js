let express = require('express')
let router = express.Router()

const awsWorker = require('../controllers/s3.controllers')

router.get('/api/s3/:filename', awsWorker.doDownload);

module.exports = router;