import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', (req: Request, res: Response) => {
        console.log('Test route works');
    res.status(201).json({
        message: 'Test route works, everything is okey!:)))'
    });
});

app.use((req: Request, res: Response) => {
    console.log('my server error', 'No Routes Matched');
    res.status(404).json({
        message: 'No Routes Matched'
    });

});

export default app;