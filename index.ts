import app from './app';
import mongoose from 'mongoose';

const PORT = 3001;
const MONGO_URL = 'mongodb+srv://eyeshield21:112212qw@cluster0.6nmjspu.mongodb.net/db-events-board?retryWrites=true&w=majority&appName=Cluster0'
const III = 'mongodb+srv://eyeshield21:112212qw@cluster0.6nmjspu.mongodb.net/db-events-board?retryWrites=true&w=majority&appName=Cluster0'

mongoose
    .connect(MONGO_URL)
    .then(() => app.listen(PORT))
    .then(() => {
        console.log('Database connected');
        console.log(`Server run on port ${PORT}`);
    })
    .catch(() => () => {
        console.log('Не запустилось ничего, ошибка какая-то');
        // console.log(error)
        // process.exit(1)
    });