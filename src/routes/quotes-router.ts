import { Router } from "express";
import { getAllQuotes, getQuoteById, createQuote, updateQuote, deleteQuote } from "../controllers/quotes-controller";
import { validateQuote } from "../middlewares/validate-middleware"; // importacion de middleware que controla el contenido de las frases

// creamos la instancia de Router
const router: Router = Router();

router.get('/', getAllQuotes);
router.get('/:id', getQuoteById);
router.post('/', validateQuote, createQuote);
router.patch('/:id', updateQuote);
router.delete('/:id', deleteQuote);

export default router;
