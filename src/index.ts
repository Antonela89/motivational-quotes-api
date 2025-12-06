import express,{ Application, Request, Response, NextFunction } from "express";
import router from "./routes/quotes-router";
import { errorMiddleware } from "./middlewares/error-middleware";

// creamos una instancia de app
const app: Application = express();

app.use(express.json());

// 4. Ruta raíz (Health Check): Para comprobar rápido si el server vive
app.get('/', (req: Request, res: Response) => {
    res.json({ message: "API de Frases Motivacionales funcionando correctamente 🚀" });
});

app.use('/api/quotes', router);

app.use((req:Request, res: Response) => {
    res.status(404).json({Error: "Endpoint no encontrada."})
})

app.use(errorMiddleware);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
})