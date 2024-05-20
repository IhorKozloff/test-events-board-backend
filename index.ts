import app from './app';
import mongoose from 'mongoose';

const { PORT = 3001, DATABASE_URL } = process.env;

mongoose
    .connect(DATABASE_URL!)
    .then(() => app.listen(PORT))
    .then(() => {
        console.log('Database connected');
        console.log(`Server run on port ${PORT}`);
    })
    .catch(() => () => {
        console.log('Не запустилось ничего, ошибка какая-то');
    });