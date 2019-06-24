import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/api';
import validate from './utilities/routeValidation';


const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 7000;

app.use('/api/v1', apiRoutes);

app.get('/', (req, res) => {
  res.status(200).send({
    status: 200,
    data: { message: 'Welcome to How-to.' },
  });
});

app.use(validate.route);

app.listen(PORT);
