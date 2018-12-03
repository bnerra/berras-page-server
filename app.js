const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const fs = require('fs')
const PDFDocument = require('pdfkit')

let app = express()
let router = require('./routers/s3.router');

app.use(cors())
app.use(bodyParser.json())
app.use('/', router);

module.exports = app