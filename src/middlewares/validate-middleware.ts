// importamos los tipos expecificos de express
import { Request, Response, NextFunction } from 'express';

// validar como ingresan los datos de una frase
export const validateQuote = (
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	const { text, author } = req.body;

	// comprobamos si se ingresaron los parametros
	if (!text || typeof text !== 'string') {
		res.status(400).json({ error: 'Texto es obligatorio.' });
		return;
	}

	if (!author || typeof author !== 'string') {
		res.status(400).json({ error: 'Autor es obligatorio.' });
		return;
	}

    // si pasa las validaciones
	next();
};
