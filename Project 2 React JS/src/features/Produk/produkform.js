import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct, updateProduct } from './productsSlice';

const ProductForm = ({ currentProduct, setCurrentProduct }) => {
  const [product, setProduct] = useState(currentProduct || { product_name: '', category: '', price: '', discount: '' });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentProduct) {
      dispatch(updateProduct({ id: currentProduct.id, product }));
    } else {
      dispatch(addProduct(product));
    }
    setCurrentProduct(null);
    setProduct({ product_name: '', category: '', price: '', discount: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{currentProduct ? 'Edit Product' : 'Add Product'}</h2>
      <input
        type="text"
        name="product_name"
        value={product.product_name}
        onChange={handleChange}
        placeholder="Product Name"
        required
      />
      <input
        type="text"
        name="category"
        value={product.category}
        onChange={handleChange}
        placeholder="Category"
        required
      />
      <input
        type="number"
        name="price"
        value={product.price}
        onChange={handleChange}
        placeholder="Price"
        required
      />
      <input
        type="number"
        name="discount"
        value={product.discount}
        onChange={handleChange}
        placeholder="Discount"
      />
      <button type="submit">{currentProduct ? 'Update' : 'Add'}</button>
    </form>
  );
};

export default ProductForm;
