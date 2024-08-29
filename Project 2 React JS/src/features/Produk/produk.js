import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/products'; // URL API Laravel

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const addProduct = createAsyncThunk('products/addProduct', async (product) => {
  const response = await axios.post(API_URL, product);
  return response.data;
});

export const updateProduct = createAsyncThunk('products/updateProduct', async ({ id, product }) => {
  const response = await axios.put(`${API_URL}/${id}`, product);
  return response.data;
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex(product => product.id === action.payload.id);
        state.items[index] = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(product => product.id !== action.payload);
      });
  },
});

export default productsSlice.reducer;
