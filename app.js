require('dotenv').config();

const express = require('express');
const app = express();

require('express-async-errors');

const morgan = require('morgan');

const connectDB = require('./db/connect');

const authRouter = require('./routes/authRoutes');
const adminUserRoutes = require('./routes/admin/userRoutes');

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(morgan('tiny'));
app.use(express.json());

app.use('/api/v1/auth', authRouter);

// admin routes
app.use('/api/admin/v1/users', adminUserRoutes);

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