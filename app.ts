import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import rootRouter from './src/routes';
import { AppError } from './src/types/AppError';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', rootRouter);

app.use((req: Request, res: Response) => {
    console.log('my server error', 'No Routes Matched');
    res.status(404).json({
        message: 'No Routes Matched'
    });

});

app.use((err: Error | AppError, req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
        const { code = 500, message = 'Events-board Server Error' } = err;
        res.status(code).json({ message });
    } else {
        const { message } = err;
        res.status(500).json({ message });
    } 
});

export default app;