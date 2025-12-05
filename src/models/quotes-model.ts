import fs from 'fs'; // modulos de sistema de archivos
import path from 'path'; // modulo de rutas

// definimos la ruta del archivo json que funciona como base de datos
const filePath = path.join(__dirname, '../database/quotes.json');

// interface que representa la estructura de una frase
interface Quote {
	id?: string;
	text: string;
	author: string;
}

// encapsulamos las operaciones relacionadas con frases en una clase
export class QuotesModel {
	// leer todas las frases desde el archivo
	static getAllQuotes(): Quote[] {
		// obtenemos todos los datos desde la bbdd
		const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
		return data.quotes;
	}

	// obtener una frase según su id
	static getQuoteByID(id: string): Quote | undefined {
		const data = this.getAllQuotes(); // obtener todas las frases
		// buscamos la frase por id
		return data.find((quote) => quote.id === id);
	}

	// Crear una frase
	static addQuote(newQuote: Quote): Quote {
        // traemos todo el contenido de json
		const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

		// creamos un nuevo ID basado en la longitud del array
		const newID = (data.quotes.length + 1).toString();

		// creamos una nueva frase
		// operador spreaad (...) se usa para combinar objetos
		const quote = { ...newQuote, id: newID };
		data.quotes.push(quote);

		// incrementamos la cantidad de frases totales
		data.info.total += 1;

		// guardar los datos en formato json
		fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

		return quote;
	}

	// actualizar una frase
	static updateQuote(id: string, updatedQuote: Partial<Quote>): Quote | null {
		const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
		const index = data.quotes.findIndex((quote: Quote) => quote.id === id);

		// si no encuentra el id
		if (index === -1) return null;

		// si lo encuentra
		const currentQuote = data.quotes[index];
		const mergedQuote = { ...currentQuote, ...updatedQuote } as Quote;
		
		data.quotes[index] = mergedQuote;
		// guardar los datos en formato json
		fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
		return mergedQuote;
	}

	// borrar una frase
    static deleteQuote(id: string): Boolean {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
		const index = data.quotes.findIndex((quote: Quote) => quote.id === id);

        // si no lo eencuentra
        if (index === -1) return false;

        // si lo encuentra
        // eliminamos la frase y reducimos el total
        data.quotes.splice(index, 1);
        data.info.total -= 1;

        // guaramos los cambios
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

        return true
    }
}
