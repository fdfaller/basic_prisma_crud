require('express-async-errors');
import express from 'express';
import ErrorHandler from './MiddleWares/ErrorHandler';
import routes from './routes';

const cors = require('cors');
const app = express();
const port = process.env.SERVER_PORT;

app.use(cors());
app.use(express.json());
app.use('/api', routes);
app.use(ErrorHandler);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
}).on('error', (e) => {
  console.log(`Error ocurred: ${e.message}`);
});