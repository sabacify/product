import React from 'react';
import { format } from 'date-fns';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  createdAt: string;
  imageUrl: string;
}

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  onView: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete, onView }) => {
  return (
    <div className="relative border rounded-lg shadow-md p-4 bg-white">
      {/* Edit and Delete Icons */}
      <div className="absolute top-3 right-3 flex space-x-2">
        <button
          onClick={() => onEdit(product)}
          className="text-blue-500 hover:text-blue-700 bg-gray-100 rounded-full w-8 h-8 flex justify-center items-center"
          aria-label="Edit Product"
        >
          <PencilSquareIcon className="h-5 w-5" />
        </button>
        <button
          onClick={() => onDelete(product)}
          className="text-red-500 hover:text-red-700 bg-gray-100 rounded-full w-8 h-8 flex justify-center items-center"
          aria-label="Delete Product"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Product Image */}
      <img
        src={product.imageUrl ? product.imageUrl : "https://parivaargroup.com/storage/app/product/img_165580532323940116862b1958b31dab993392709.png"}
        alt={product.name}
        className="w-full h-32 object-cover rounded-md mb-4"
      />

      {/* Product Details */}
      <div className="flex flex-col space-y-2 cursor-pointer" onClick={() => onView(product)}>
        <h3 className="text-sm font-medium text-gray-800">{product.name}</h3>
        <p className="text-xs text-gray-500">{product.description}</p>
        <div className="flex justify-between items-center text-sm font-semibold">
          <span className="text-gray-400 text-xs">
            Added on {format(new Date(product.createdAt), 'dd MMM yyyy')}
          </span>
          <span className="text-gray-800">USD {product.price}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
