import express from 'express';
import cors from 'cors';
import appRoute from './routes/route.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cors());

app.use('/api', appRoute);

export { app };