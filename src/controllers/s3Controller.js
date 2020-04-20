const AWS = require('aws-sdk');
const S3 = new AWS.S3();

const getFile = async (event) => {
    const bucket = event.Records[0].s3.bucket.name;
    const fileKey = event.Records[0].s3.object.key;
    const params = {
        Bucket: bucket, 
        Key: fileKey, 
    }
    const file = await S3.getObject(params).promise();
    return file;
}

module.exports = {
    getFile
}