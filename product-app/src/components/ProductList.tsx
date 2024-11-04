import ProductCard from './ProductCard';
import AddProductCard from './AddProductCard';
import ProductModal, { Mode } from './ProductModal';
import { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { Product } from './ProductCard';
import toast, { Toaster } from 'react-hot-toast';

const DEFAULT_PAGE_SIZE = 5;

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>();
  const [product, setProduct] = useState<Product>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [mode, setMode] = useState<Mode>();

  const handleClose = () => {
    setMode(undefined)
    setProduct(undefined)
    setIsModalOpen(false);
  };

  const BACKEND_URL = "http://localhost:3001";

  const addOrEditProduct = async (_product: Product) => {
    try {
      const response = await fetch(`${BACKEND_URL}/v1/products${_product.id ? `/${_product.id}` : ``}`, {
        method: mode === Mode.EDIT ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(_product),
      });

      if (!response.ok) throw new Error('Failed to add product: '+response.statusText);
      await response.json();
    } catch(e: any) {
      toast.error(e.message || 'An error occurred while saving the product');
    }
  };

  const softDeleteProduct = async (productId: string) => {
    const response = await fetch(`${BACKEND_URL}/v1/products/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    await response.json();
  }

  const handleAddProduct = () => {
    setMode(Mode.ADD)
    setProduct(undefined);
    setIsModalOpen(true);
  };

  const handleViewProduct = (_product: Product) => {
    setMode(Mode.VIEW)
    setProduct(_product)
    setIsModalOpen(true);
  }

  const handleSaveProduct = async (_product: Product) => {
    await addOrEditProduct(_product);
    await fetchProducts();
    setProduct(undefined);
    setMode(undefined);
    setIsModalOpen(false);
  };

  const handleEditProduct = (_product: any) => {
    setMode(Mode.EDIT)
    setProduct(_product)
    setIsModalOpen(true);
  }

  const handleSoftDeleteProduct = async (_product: any) => {
    await softDeleteProduct(_product.id)
    await fetchProducts();
  }

  const hasMore = () => page * DEFAULT_PAGE_SIZE < totalCount;

  const handleNextPage = () => {
    if (hasMore()) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const fetchProducts = async () => {
    const response = await fetch(`${BACKEND_URL}/v1/products?page=${page}&limit=${DEFAULT_PAGE_SIZE}`);
    const res = await response.json();

    setProducts(res.products);
    setTotalCount(res.total);
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  return (
    <div>
      <Toaster position="top-right" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        <AddProductCard onAddProduct={handleAddProduct} />
        {products &&
          products.map((product: Product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={handleEditProduct}
              onDelete={handleSoftDeleteProduct}
              onView={handleViewProduct}
            />  
          )
        )}
      </div>

      <div className="flex justify-center items-center my-4 space-x-4">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
        </button>
        <span>Page {page} of {Math.ceil(totalCount / DEFAULT_PAGE_SIZE)}</span>
        <button
          onClick={handleNextPage}
          disabled={!hasMore()}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          <ChevronRightIcon className="h-5 w-5 text-gray-600" />
        </button>
      </div>
      <ProductModal open={isModalOpen} mode={mode} product={product} onClose={handleClose} onSave={handleSaveProduct} />
    </div>
  );
};

export default ProductList;
