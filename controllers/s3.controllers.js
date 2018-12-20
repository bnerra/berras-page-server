var stream = require('stream')
const AWS = require('aws-sdk');
const sgMail = require('@sendgrid/mail')
require('dotenv').config();

const s3 = require('../config/s3.config')

exports.doDownload = (req, res) => {
  const s3Client = s3.s3Client;
  const params = s3.downloadParams;

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS'); // If needed
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Credentials', false); // If needed
  res.setHeader('isBase64Encoded', true);
  res.setHeader('Content-Type', 'application/pdf');

s3Client.getObject({
  Bucket: 'bnerra.com',
  Key: 'NBerraResume.pdf'
}, function(err, data) {
  if (err) {
    console.log(err, err.stack);
  } else {
    res.send(data.Body.toString('base64'));
  }
});
}

exports.sendEmail = (req, res) => {

  if (req.body.email !== '') {
    res.setHeader('Content-Type', 'multipart/form-data');
    res.setHeader('Accept', 'multipart/form-data');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST'); // If needed
    res.setHeader('Access-Control-Allow-Headers', '*');

    res.status(200).send('Thank you.')
  } else {

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: 'bnerra.contact@gmail.com',
      from: req.body.emailAddress,
      subject: 'Contact request from ' + req.body.senderName + ' at bnerra.com',
      text: req.body.emailMessage
    }

    res.setHeader('Content-Type', 'multipart/form-data');
    res.setHeader('Accept', 'multipart/form-data');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST'); // If needed
    res.setHeader('Access-Control-Allow-Headers', '*');

    // TODO: Error handling if correct data is not sent

    sgMail.send(msg, function(err, data) {
      if (err) {
        console.log(err, err.stack);
        res.status(400).send('Bad Request' + err)
      } else {
        res.status(200).send(data.Body);
      }
    });
  }
}

exports.getData = (req, res) => {
  console.log(req.body);

  

  // res.setHeader('Content-Type', 'multipart/form-data');
  // res.setHeader('Accept', 'multipart/form-data');
  // res.setHeader('Access-Control-Allow-Origin', '*');
  // res.setHeader('Access-Control-Allow-Methods', 'POST'); // If needed
  // res.setHeader('Access-Control-Allow-Headers', '*');

//   emailExists.check(req.body.email, function(error, response){
//     console.log('res: '+response);
// });

  // res.status(200).send(req.body);
}