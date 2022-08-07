import express from 'express';
import cors from 'cors';

import combine from './routes/combine.js';
import cleanup from './routes/cleanup.js';

import { PORT } from './utils/variable.js';

const app = express();

app.use(cors());

app.use('/combine', combine);
app.use('/cleanup', cleanup);


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`backend listening on port ${PORT}`);
});