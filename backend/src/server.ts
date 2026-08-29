import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import eventRoutes from './routes/eventRoutes';
import authRoutes from './routes/authRoutes';
import adminRoutes from './routes/adminRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Authentication Routes
app.use('/api/auth' , authRoutes);

app.use('/api/admin/' , adminRoutes);

//Api Routes
app.use('/api/events', eventRoutes);


app.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});