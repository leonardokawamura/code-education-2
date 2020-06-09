<?php

use App\Models\Product;
use App\Models\ProductPhoto;
use Illuminate\Database\Seeder;
use Illuminate\Http\UploadedFile;

class ProductPhotosTableSeeder extends Seeder
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
        $this->allFakerPhotos = $this->getFakerPhotos();
        $products = Product::all();
        $self = $this;
        $products->each(function($product) use($self) {
            $self->createPhotoDir($product);
            $this->createPhotosModels($product);
        });

    }

    private function getFakerPhotos()
    {
        $path = storage_path($this->fakerPhotosPath);
        return collect(File::allFiles($path));
    }

    private function createPhotoDir(Product $product)
    {
        $path = ProductPhoto::photosPath($product->id);
        File::makeDirectory($path, 0777, true);
    }

    private function createPhotosModels(Product $product)
    {
        foreach(range(1, 5) as $v) {
            $this->createPhotoModel($product);
        }
    }

    private function createPhotoModel(Product $product)
    {
        $photo = ProductPhoto::create([
            'product_id' => $product->id,
            'file_name' => 'image.jpg'
        ]);
        $this->generatePhoto($photo);
    }

    private function generatePhoto(ProductPhoto $photo)
    {
        $photo->file_name = $this->uploadPhoto($photo->product_id);
        $photo->save();
    }

    private function uploadPhoto($productId) 
    {
        $photoFile = $this->allFakerPhotos->random();
        $uploadFile = new UploadedFile(
            $photoFile->getRealPath(), str_random(16) . '.' . $photoFile->getExtension()
        );
        ProductPhoto::uploadFiles($productId, [$uploadFile]);
        return $uploadFile->hashName();
    }
}
