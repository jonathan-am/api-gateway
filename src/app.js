import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import handler from '~/middlewares/handler/exception.handler.js';
import routes from '~/routes/v1';

const app = express();

// app.use(morgan())
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(compression());
app.use(cors());
app.use('/v1', routes);
app.use(handler);

export default app;