let express = require('express')
let router = express.Router()

const awsWorker = require('../controllers/s3.controllers')

router.get('/api/s3', awsWorker.doDownload);

module.exports = router;