import express from 'express';
import cors from 'cors';


const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 7000;


app.get('/', (req, res) => {
  res.status(200).send({
    status: 200,
    data: { message: 'Welcome to How-to.' },
  });
});


app.listen(PORT);

