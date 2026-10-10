import express from 'express';
import dotenv from 'dotenv';
import loanRoutes from './routes/loanRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Library Loan API' });
});

app.use('/api/loans', loanRoutes);

export default app;
