const s3Controller = require('./controllers/s3Controller');
const parserController = require('./controllers/parserController');
const databaseController = require('./controllers/databaseController');

exports.handler = async (event) => {
    const file = s3Controller.getFile(event);
    const tracks = parserController.parse(file);

    databaseController.insert(tracks)
};
