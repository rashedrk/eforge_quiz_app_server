import express, { Application, Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import router from "./app/routes";

const app: Application = express();
app.use(express.json());
app.use(cors({ origin: ['http://localhost:5173', "https://eforge-quiz-app-client.vercel.app"], credentials: true }));

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to EForge Quiz App Server');
});

//Application Routes
app.use('/api/v1', router);

//Global Error Handler
app.use(globalErrorHandler);

export default app;