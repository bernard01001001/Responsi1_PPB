import express from 'express';
import dotenv from 'dotenv';
import loanRoutes from './routes/loanRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'Welcome to Library Loan API' });
});

app.use('/api/loans', loanRoutes);

export default app;

if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}