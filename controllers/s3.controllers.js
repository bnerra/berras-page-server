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
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: 'nberra90@gmail.com',
    from: req.body.emailAddress,
    subject: 'Contact request from ' + req.body.senderName + ' at bnerra.com',
    text: req.body.emailMessage
  }

  sgMail.send(msg, function(err, data) {
    if (err) {
      console.log(err, err.stack);
    } else {
      res.status(200).send(data.Body);
    }
  });
}

exports.getData = (req, res) => {
  console.log(req.data);

  res.status(200).send({data: req.data});
}