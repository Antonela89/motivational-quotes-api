import { Request, Response } from 'express'; // importamos los tipos para definir las funciones de los controladores
import { QuotesModel } from '../models/quotes-model'; // importacion del modelo de datos

// controlador para obtener todas las frases
export const getAllQuotes = (req: Request, res: Response): void => {
	try {
        // llamar al modelo
		const quotes = QuotesModel.getAllQuotes();
        // devolver las frases en formato json
		res.json(quotes);
	} catch (error) {
		res.status(500).json({ error: 'Error al obtener las frases' });
	}
};

// controlador para obtener una frase por id
export const getQuoteById = (req: Request<{ id: string }>, res: Response): void => {
	const { id } = req.params; // extrae el id del endpoint

    // llamamos al modelo
	const quote = QuotesModel.getQuoteByID(id);

	// si no encuentra
	if (!quote) {
		res.status(404).json({ error: 'Frase no encontrada' });
		return;
	}

	// si la encuentra, envia la respuesta
	res.json(quote);
};

// controlador para crear una frase
export const createQuote = (req: Request, res: Response): void => {
    // llamar al modelo
    const newQuote = QuotesModel.addQuote(req.body); // obtener los datos del cuerpo de la peticion del usuario
    // retornar la frase
    res.status(201).json(newQuote);
};

// controlador para editar una frase
export const updateQuote = (req: Request<{ id: string }>, res: Response): void => {
	const { id } = req.params;
    const editQuote = QuotesModel.updateQuote(id, req.body);

    // si no lo encuentra
    if (!editQuote) {
        res.status(404).json({Error: "Frase no encontrada."});
        return
    }

    // devolver la frase
    res.status(200).json(editQuote);
};

// controlador para eliminar una frase
export const deleteQuote = (req: Request<{ id: string }>, res: Response): void => {
	const { id } = req.params;

    // llamamos al modelo
    const isDeleted = QuotesModel.deleteQuote(id); // devuelve true o false

    // si no lo encuentra
    if (!isDeleted) {
        res.status(404).json({ error: 'Frase no encontrada' });
        return;
    }

    // si lo encuentra
    res.status(204).json({ message: `Frase ${id} eliminada correctamente`})
};
