import React from 'react';

interface AddProductCardProps {
  onAddProduct: () => void;
}

const AddProductCard: React.FC<AddProductCardProps> = ({ onAddProduct }) => {
  return (
    <div
      className="flex flex-col items-center justify-center border-dashed border-2 border-gray-300 rounded-lg h-64 cursor-pointer hover:bg-gray-100"
      onClick={onAddProduct}
    >
      <div className="text-gray-500 text-4xl mb-2">+</div>
      <div className="text-gray-500">Add New Product</div>
    </div>
  );
};

export default AddProductCard;