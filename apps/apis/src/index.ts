import express, { Request, Response, Express } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frontendPath = path.join(__dirname, '../../', 'client/dist');

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(frontendPath));

app.get('/api', (_req: Request, res: Response): void => {
  res.send('Hello World!');
  console.log('Hello World!');
});

app.listen(PORT, (): void => {
  console.log(`Server started on port ${PORT}`);
});