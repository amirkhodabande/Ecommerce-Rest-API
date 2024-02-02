require('dotenv').config();

const express = require('express');
const app = express();

const morgan = require('morgan');

const connectDB = require('./db/connect');

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(morgan('tiny'));
app.use(express.json());

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);

        app.listen(port, console.log(`Listening to port ${port}...`));
    } catch (error) {
        console.log(error);
    }
}

start();