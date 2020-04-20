const s3Controller = require('./controllers/s3Controller');
const parserController = require('./controllers/parserController');
const databaseController = require('./controllers/databaseController');

exports.handler = async (event) => {
    const file = await s3Controller.getFile(event);
    const tracks = await parserController.parse(file);

    await databaseController.insert(tracks)
};
