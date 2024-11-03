import React, { useState } from 'react';
import { Product } from './ProductCard';
import { useEffect } from 'react';

interface ProductModalProps {
  product: Product | undefined;
  mode: Mode | undefined;
  open: boolean;
  onClose: () => void;
  onSave: (product: any) => void;
}

export enum Mode {
  VIEW = 'view',
  EDIT = 'edit',
  ADD = 'add'
}

const ProductModal: React.FC<ProductModalProps> = ({ product, open, mode, onClose, onSave }) => {
  const [name, setName] = useState<string | undefined>();
  const [description, setDescription] = useState<string | undefined>();
  const [price, setPrice] = useState<number | undefined>();
  const [imageUrl, setImageUrl] = useState<string | undefined>();

  const handleSave = () => {
    onSave({
      ...(product ? product : {}),
      name,
      description,
      price,
      imageUrl
    });
  };

  const viewMode = mode === Mode.VIEW
  const editMode = mode === Mode.EDIT

  let verb = 'Add';
  switch (mode) {
    case Mode.EDIT:
      verb = 'Edit';
      break;
    case Mode.VIEW:
      verb = 'View';
      break;
  }

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setImageUrl(product.imageUrl);
    } else {
      setName(undefined);
      setDescription(undefined);
      setPrice(undefined);
      setImageUrl(undefined);
    }
  }, [product, mode])

  return open ? (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-80">
        <h2 className="text-xl font-semibold mb-4">{verb} New Product</h2>
        <input
          type="text"
          placeholder="Name"
          className={`w-full border p-2 rounded mb-2 ${viewMode || editMode ? "read-only:bg-gray-100": ""}`}
          value={name}
          readOnly={viewMode || editMode}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className={`w-full border p-2 rounded mb-2 ${viewMode ? "read-only:bg-gray-100": ""}`}
          value={description}
          readOnly={viewMode}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price (In USD)"
          className={`w-full border p-2 rounded mb-2 ${viewMode ? "read-only:bg-gray-100": ""}`}
          value={price}
          readOnly={viewMode}
          onChange={(e) => setPrice(parseInt(e.target.value, 10))}
        />
        <input
          type="text"
          placeholder="Image URL"
          className={`w-full border p-2 rounded mb-2 ${viewMode ? "read-only:bg-gray-100": ""}`}
          value={imageUrl}
          readOnly={viewMode}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        {imageUrl && (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-32 object-cover rounded-md mb-4"
          />
        )}
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          {!viewMode && <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded">
            Save
          </button>}
        </div>
      </div>
    </div>
  ) : null;
};

export default ProductModal;