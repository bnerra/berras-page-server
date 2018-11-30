const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const fs = require('fs')
const PDFDocument = require('pdfkit')

let app = express()
app.use(cors())
app.use(bodyParser.json())

// public route that anyone can access
app.get('/hello', (req, res) => {
  return res.json({
    message: 'Hello world!'
  })
})

app.get('/html', (req, res) => {
  const src = fs.createReadStream('./template.html');
  src.pipe(res);
})

app.get('/pdf', (req, res) => {
  const doc = new PDFDocument();
  res.contentType("application/pdf");
  res.setHeader('Content-disposition', 'attachment; filename=testFile.pdf')
  doc.pipe(res);

   doc.moveTo(300, 75)
  .lineTo(373, 301)
  .lineTo(181, 161)
  .lineTo(419, 161)
  .lineTo(227, 301)
  .fill('red', 'even-odd');

  const loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in...';  

  doc.y = 320;
  doc.fillColor('black')
  doc.text(loremIpsum, {
    paragraphGap: 10,
    indent: 20,
    align: 'justify',
    columns: 2
  });  
  doc.end()
})

module.exports = app