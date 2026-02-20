<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(): Response
    {
        $products = Product::query()
            ->where('status', 'active')
            ->orderBy('name')
            ->get()
            ->map(fn (Product $product) => [
                'name' => $product->name,
                'slug' => $product->slug,
                'sku' => $product->sku,
                'excerpt' => $product->excerpt,
                'price' => $product->price,
                'currency' => $product->currency,
                'stock' => $product->stock,
                'image_url' => $product->image_url,
            ])
            ->toArray();

        return Inertia::render('produit', [
            'products' => $products,
        ]);
    }

    public function show(Product $product): Response
    {
        return Inertia::render('produit-details', [
            'product' => [
                'name' => $product->name,
                'slug' => $product->slug,
                'sku' => $product->sku,
                'excerpt' => $product->excerpt,
                'description' => $product->description,
                'price' => $product->price,
                'currency' => $product->currency,
                'stock' => $product->stock,
                'image_url' => $product->image_url,
            ],
        ]);
    }
}
