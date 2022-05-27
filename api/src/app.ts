import express from "express";
import 'dotenv/config';
import routes from "./routes/routes";
const app = express();

app.use(express.json());
app.use(routes);

app.listen(process.env.APP_PORT);