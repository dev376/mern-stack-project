import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import eventRoutes from './routes/events.js';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(bodyParser.json({ limit: "30mb", extended: true }));

app.use(cors());

app.use('/events', eventRoutes);

app.get('/', (req, res) => {
    res.send('Hello to Events Listing And Viewing API');
})

const CONNECTION_URL = 'mongodb+srv://Hawkeys:Pavilion%4028@cluster0.fmoq9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port : ${PORT}`)))
    .catch((error) => console.log(`${error} did not connect`))

