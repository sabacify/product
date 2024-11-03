import { PrismaClient as PC, Product } from '@prisma/client';
import { DEFAULT_PAGE_SIZE } from '../constants';

const model = new PC();

export class ProductRepository {
  static async getAllProducts(page: number = 1, limit: number = DEFAULT_PAGE_SIZE): Promise<Product[]> {
    const offset = (page - 1) * limit;
    return model.product.findMany({
      where: { deleted: 0 },
      skip: offset,
      take: limit,
    });
  }

  static async getAllProductsCount(): Promise<number> {
    return model.product.count({
      where: { deleted: 0 },
    });
  }

  static async getProductById(id: number): Promise<Product | null> {
    return model.product.findUnique({
      where: { id, deleted: 0 },
    });
  }

  static async createProduct(data: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'deleted'>): Promise<Product> {
    return model.product.create({
      data,
    });
  }

  static async softDeleteProduct(id: number): Promise<void> {
    const timestamp = Math.floor(Date.now() / 1000);
    await model.product.update({
      where: { id },
      data: { deleted: timestamp },
    });
  }

  static async updateProduct(id: number, data: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'deleted'>>): Promise<Product> {
    return model.product.update({
      where: { id, deleted: 0 },
      data,
    });
  }
}
