import { ProductRepository } from '../repositories/product';
import { Product, Prisma } from '@prisma/client';
import _ from 'lodash';
import { ConflictError } from '../utils/error';

export class ProductService {
  static async getAllProducts(page: number = 1, limit: number = 10): Promise<Product[]> {
    return ProductRepository.getAllProducts(page, limit);
  }

  static async getAllProductsCount(): Promise<number> {
    return ProductRepository.getAllProductsCount();
  }

  static async getProductById(id: number): Promise<Product | null> {
    return ProductRepository.getProductById(id);
  }

  static async createProduct(data: { name: string; description?: string; price: number; imageUrl?: string }): Promise<Product> {
    try {
      return await ProductRepository.createProduct({
        name: data.name,
        description: data.description || "",
        price: data.price,
        imageUrl: data.imageUrl || ""
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictError();
      }
      throw error;
    }
  }

  static async softDeleteProduct(id: number): Promise<void> {
    return ProductRepository.softDeleteProduct(id);
  }

  static async updateProduct(id: number, data: Partial<Product>): Promise<Product> {
    return ProductRepository.updateProduct(id, data);
  }
}
