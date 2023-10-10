import "dotenv/config"
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes/user.routes.js';


const app = express()

app.use(cors({
    origin: "*"
}));

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            messege: error.message
        }
    });
});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
//user and movie api
app.use('/api',router)

// Set up other routes for authentication, update, delete, etc.
const PORT = process.env.PORT || 3000
app.listen(PORT, async () => {
    try {
        console.log(`Server is running on port ${PORT}`);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});