import React, { useState } from 'react';
import ProductList from './features/products/ProductList';
import ProductForm from './features/products/ProductForm';

function App() {
  const [currentProduct, setCurrentProduct] = useState(null);

  const handleEdit = (product) => {
    setCurrentProduct(product);
  };

  return (
    <div className="App">
      <h1>Product Management</h1>
      <ProductForm currentProduct={currentProduct} setCurrentProduct={setCurrentProduct} />
      <ProductList onEdit={handleEdit} />
    </div>
  );
}

export default App;
