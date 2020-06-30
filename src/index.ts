import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
import * as cors from 'cors';
import Routes from './routes';

const app = express();
createConnection();

app.use(express.json());
app.use(cors());
app.use(Routes);
app.listen('3333');
