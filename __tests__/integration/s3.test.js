const s3Controller = require('../../src/controllers/s3Controller');

const mockEvent = {
    "Records": [
      {
        "eventVersion": "2.1",
        "eventSource": "aws:s3",
        "awsRegion": "us-east-1",
        "eventTime": "2020-04-18T11:33:53.192Z",
        "eventName": "ObjectCreated:Put",
        "userIdentity": {
          "principalId": "AWS:AIDAINPONIXQXHT3IKHL2"
        },
        "requestParameters": {
          "sourceIPAddress": "205.255.255.255"
        },
        "responseElements": {
          "x-amz-request-id": "D82B88E5F771F645",
          "x-amz-id-2": "vlR7PnpV2Ce81l0PRw6jlUpck7Jo5ZsQjryTjKlc5aLWGVHPZLj5NeC6qMa0emYBDXOo6QBU0Wo="
        },
        "s3": {
          "s3SchemaVersion": "1.0",
          "configurationId": "828aa6fc-f7b5-4305-8584-487c791949c1",
          "bucket": {
            "name": "spotify-recently-played-raw-files",
            "ownerIdentity": {
              "principalId": "A3I5XTEXAMAI3E"
            },
            "arn": "arn:aws:s3:::spotify-recently-played-raw-files"
          },
          "object": {
            "key": "raw_files/2020-04-19/1587263632439.json",
            "size": 1305107,
            "eTag": "b629c13e496b223e1cc84435025f3edf",
            "sequencer": "0C0F6F405D6ED209E1"
          }
        }
      }
    ]
  }

describe('S3', () => {
    it('should return a S3 file', async () => {
        const file = await s3Controller.getFile(mockEvent);
        console.log(file);
        expect(file).toBeDefined();
    })
})