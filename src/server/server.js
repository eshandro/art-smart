const Express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const serverConfig = require('./config');

const devMode = process.env.NODE_ENV !== 'production';
const PATHS = serverConfig.PATHS;

// Initialize Express app
const app = new Express();

// MongoDB Connection
mongoose.Promise = global.Promise;
// mongoose.set('debug', true);

mongoose.connect(serverConfig.mongoURL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (error) => {
    if (error) {
        console.log(`MongoDB connection error: ${error}`);
        throw error;
    } else {
        console.log('Successful connection to MongoDB');
    }
});

// Pull in Routes
// const sampleRouteName = require('./routes/sample_route_name');

/**
 * Document routes - route path plus type (GET, POST, etc.)
 * API routes:
 * 
**/

app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
// Path is wrong here -- need a path based on NODE_ENV production
app.use(Express.static(devMode ? PATHS.dist : PATHS.public));
// app.use('/api/sample_route_path', sampleRouteName);

// may need this for react-router in the future
// app.get('*', (req,res) => {
// 	res.sendFile(path.join(__dirname, '../../dist/index.html'));
// });


app.listen(serverConfig.port, (error) => {
    if (!error) {
        console.log(`Express server running on port ${serverConfig.port}`);
    } else {
        console.log(`Express server error: ${error}`);
        throw error;
    }
});

