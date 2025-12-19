<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        return response()->json(Product::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'nullable|string|max:255',
            'daily_rate' => 'required|numeric|min:0',
            'weekly_rate' => 'nullable|numeric|min:0',
            'monthly_rate' => 'nullable|numeric|min:0',
            'quantity_available' => 'nullable|integer|min:0',
            'image' => 'nullable|string',
            'images' => 'nullable|array',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'videos' => 'nullable|array',
            'videos.*' => 'nullable|file|mimes:mp4,avi,mov,wmv,flv,webm|max:51200',
            'status' => 'nullable|in:available,rented,maintenance',
        ]);

        // Set default values for optional fields
        $validated['weekly_rate'] = $validated['weekly_rate'] ?? null;
        $validated['monthly_rate'] = $validated['monthly_rate'] ?? null;
        $validated['quantity_available'] = $validated['quantity_available'] ?? 1;

        // Handle multiple image uploads
        if ($request->hasFile('images')) {
            $imagePaths = [];
            foreach ($request->file('images') as $image) {
                $path = $image->store('products', 'public');
                $imagePaths[] = $path;
            }
            $validated['images'] = $imagePaths;
        }

        // Handle multiple video uploads
        if ($request->hasFile('videos')) {
            $videoPaths = [];
            foreach ($request->file('videos') as $video) {
                $path = $video->store('products/videos', 'public');
                $videoPaths[] = $path;
            }
            $validated['videos'] = $videoPaths;
        }

        $product = Product::create($validated);
        return response()->json($product, 201);
    }

    public function show(Product $product)
    {
        return response()->json($product);
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'nullable|string|max:255',
            'daily_rate' => 'required|numeric|min:0',
            'weekly_rate' => 'nullable|numeric|min:0',
            'monthly_rate' => 'nullable|numeric|min:0',
            'quantity_available' => 'nullable|integer|min:0',
            'image' => 'nullable|string',
            'images' => 'nullable|array',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'videos' => 'nullable|array',
            'videos.*' => 'nullable|file|mimes:mp4,avi,mov,wmv,flv,webm|max:51200',
            'existing_images' => 'nullable|string',
            'existing_videos' => 'nullable|string',
            'status' => 'nullable|in:available,rented,maintenance',
        ]);

        // Set default values for optional fields if not provided
        if (!isset($validated['weekly_rate'])) {
            $validated['weekly_rate'] = null;
        }
        if (!isset($validated['monthly_rate'])) {
            $validated['monthly_rate'] = null;
        }
        if (!isset($validated['quantity_available'])) {
            $validated['quantity_available'] = $product->quantity_available ?? 1;
        }

        // Handle images - merge existing with new uploads
        $finalImages = [];
        
        // Get existing images that weren't removed
        if ($request->has('existing_images')) {
            $existingImages = json_decode($request->existing_images, true);
            if (is_array($existingImages)) {
                $finalImages = $existingImages;
            }
        }
        
        // Add new uploaded images
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('products', 'public');
                $finalImages[] = $path;
            }
        }
        
        $validated['images'] = $finalImages;

        // Handle videos - merge existing with new uploads
        $finalVideos = [];
        
        // Get existing videos that weren't removed
        if ($request->has('existing_videos')) {
            $existingVideos = json_decode($request->existing_videos, true);
            if (is_array($existingVideos)) {
                $finalVideos = $existingVideos;
            }
        }
        
        // Add new uploaded videos
        if ($request->hasFile('videos')) {
            foreach ($request->file('videos') as $video) {
                $path = $video->store('products/videos', 'public');
                $finalVideos[] = $path;
            }
        }
        
        $validated['videos'] = $finalVideos;

        $product->update($validated);
        return response()->json($product);
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json(null, 204);
    }
}
