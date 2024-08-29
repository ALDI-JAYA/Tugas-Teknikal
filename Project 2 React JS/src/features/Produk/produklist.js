import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, deleteProduct } from './productsSlice';

const ProductList = ({ onEdit }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.product_name} - ${product.price}
            <button onClick={() => onEdit(product)}>Edit</button>
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
