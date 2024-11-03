import express, { Request, Response } from 'express';
import { ProductService } from './services/product';
import { DEFAULT_PAGE_SIZE } from './constants';
import { AppError } from './utils/error';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

const API_PREFIX = '/v1';

app.get(`${API_PREFIX}/products`, async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || DEFAULT_PAGE_SIZE;

  const products = await ProductService.getAllProducts(page, limit);
  const total = await ProductService.getAllProductsCount();
  res.json({ products, total });
});

app.get(`${API_PREFIX}/products/:id`, async (req: Request, res: Response) => {
  const product = await ProductService.getProductById(Number(req.params.id));
  product ? res.json(product) : res.status(404).json({ message: 'Product not found' });
});

app.post(`${API_PREFIX}/products`, async (req: Request, res: Response) => {
  try {
    const newProduct = await ProductService.createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (e) {
    const error = e as AppError;
    res.status(error.statusCode || 500).json({ message: error.message });
  }
});

app.delete(`${API_PREFIX}/products/:id`, async (req: Request, res: Response) => {
  try {
    await ProductService.softDeleteProduct(Number(req.params.id));
    res.json({ message: 'Product soft-deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error soft-deleting product' });
  }
});

app.put(`${API_PREFIX}/products/:id`, async (req: Request, res: Response) => {
  const updatedProduct = await ProductService.updateProduct(Number(req.params.id), req.body);
  res.json(updatedProduct);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});