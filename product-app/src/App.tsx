import React from 'react';
import ProductList from './components/ProductList';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <h1 className="text-left px-6 text-2xl font-bold py-6">Products</h1>
      <ProductList />
    </div>
  );
}

export default App;
