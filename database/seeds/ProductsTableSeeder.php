<?php

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\File;

class ProductsTableSeeder extends Seeder
{
    private $allFakerPhotos;
    private $fakerPhotosPath = 'app/faker/product_photos';

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = Category::all();
        $this->allFakerPhotos = $this->getFakerPhotos();
        $this->deleteAllPhotosInProductPath();
        factory(Product::class, 30)
            ->make()
            ->each(function(Product $product) use ($categories) {
                $product = Product::createWithPhoto($product->toArray() + ['photo' => $this->getUploadedFile()]);
                $categoryId = $categories->random()->id;
                $product->categories()->attach($categoryId);
            });
    }

    private function deleteAllPhotosInProductPath()
    {
        $path = Product::PRODUCTS_PATH;
        File::deleteDirectory(storage_path($path), true);
    }

    private function getFakerPhotos(): Collection
    {
        $path = storage_path($this->fakerPhotosPath);
        return collect(File::allFiles($path));
    }

    private function getUploadedFile(): UploadedFile
    {
        $photoFile = $this->allFakerPhotos->random();
        $uploadFile = new UploadedFile(
            $photoFile->getRealPath(),
            str_random(16) . '.' . $photoFile->getExtension()
        );
        return $uploadFile;
    }  
    
}
