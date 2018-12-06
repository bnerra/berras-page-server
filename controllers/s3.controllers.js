var stream = require('stream')

const s3 = require('../config/s3.config')

exports.doDownload = (req, res) => {
  const s3Client = s3.s3Client;
  const params = s3.downloadParams;

  // var filestream = s3Client.getObject(params,)
  //   .createReadStream()
  //     .on('error', function(err){
  //       res.status(500).json({error:"Error -> " + err});
  //     });

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS'); // If needed
  res.setHeader('Access-Control-Allow-Headers', '*');
  // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, X-Amz-Date, Authorization, X-Api-Key, X-Amz-Security-Token'); // If needed
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
    // res.send(data.Body);
  }
});


  // filestream.pipe(res);
}