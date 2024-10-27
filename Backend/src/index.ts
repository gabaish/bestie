import express from 'express';
import dotenv from 'dotenv';
import registrationRoutes from './routes/registrationRoutes';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api', registrationRoutes);

const PORT = process.env.PORT;

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});

