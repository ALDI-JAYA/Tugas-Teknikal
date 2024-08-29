<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProductController extends Controller
{
    // Fetch all products
    public function index()
    {
        return Product::all();
    }

    // buat produk baru
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'product_name' => 'required|string|max:150',
            'category' => 'required|string|max:100',
            'price' => 'required|numeric',
            'discount' => 'nullable|numeric',
        ]);

        $product = Product::create($validatedData);

        return response()->json($product, 201);
    }

    // Lihat produk
    public function show($id)
    {
        $product = Product::findOrFail($id);

        return $product;
    }

    // Ubah produk
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'product_name' => 'string|max:150',
            'category' => 'string|max:100',
            'price' => 'numeric',
            'discount' => 'nullable|numeric',
        ]);

        $product = Product::findOrFail($id);
        $product->update($validatedData);

        return response()->json($product, 200);
    }

    // hapus produk
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return response()->json(null, 204);
    } 
}
