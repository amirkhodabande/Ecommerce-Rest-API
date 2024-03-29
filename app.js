require('dotenv').config();

const express = require('express');
const app = express();

require('express-async-errors');

const morgan = require('morgan');

const connectDB = require('./db/connect');

const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const adminUserRouter = require('./routes/admin/userRoutes');

const authenticationMiddleware = require('./middleware/authentication');
const authorizationMiddleware = require('./middleware/authorization');

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(morgan('tiny'));
app.use(express.json());

app.use('/api/v1/auth', authRouter);

app.use('/api/v1/users', authenticationMiddleware, userRouter);

// admin routes
app.use('/api/admin/v1/users', authenticationMiddleware, authorizationMiddleware('admin'), adminUserRouter);

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