<?php

namespace App\Models;

use DB;
use File;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
use Storage;

class ProductPhoto extends Model
{
    const DIR_PRODUCTS = 'products';
    const BASE_PATH = 'app/public';
    const PRODUCTS_PATH = self::BASE_PATH . '/' . self::DIR_PRODUCTS;

    protected $fillable = ['file_name', 'product_id'];

    public static function photosPath($productId)
    {
        $path = self::PRODUCTS_PATH;        
        return storage_path("{$path}/{$productId}");
    }

    public static function createWithPhotosFiles(int $productId, array $files)
    {
        try {
            self::uploadFiles($productId, $files);
            DB::beginTransaction();            
            $photos = self::createPhotosModels($productId, $files);
            DB::commit();
            return new Collection($photos);
        } catch (\Exception $e) {
            self::deleteFiles($productId, $files);
            DB::rollBack();
            throw $e;
        }    
    }

    public function updateWithPhoto(UploadedFile $file)
    {
        try {
            self::uploadFiles($this->product_id, [$file]);
            DB::beginTransaction();
            $this->deletePhoto($this->file_name);
            $this->file_name = $file->hashName();
            $this->save();
            DB::commit();
            return $this;
        } catch (\Exception $e) {
            self::deleteFiles($this->product_id, [$file]);
            DB::rollBack();
            throw $e;
        }    
    }

    public function deleteWithPhoto()
    {
        try {            
            DB::beginTransaction();            
            $this->deletePhoto($this->file_name);
            $result = $this->delete();
            DB::commit();
            return $result;
        } catch (\Exception $e) {            
            DB::rollBack();
            throw $e;
        }    
    }

    private function deletePhoto($fileName)
    {
        $dir = self::photosDir($this->product_id);
        Storage::disk(env('FILESYSTEM_DRIVER'))->delete("{$dir}/{$fileName}");
    }
    
    public static function deleteFiles(int $productId, array $files)
    {
        foreach($files as $file) {
            $path = self::photosPath($productId);
            $photoPath = "{$path}/{$file->hashName()}";
            if (file_exists($photoPath)) {
                File::delete($photoPath);
            }
        }
    }

    public static function uploadFiles(int $productId, array $files)
    {
        $dir = self::photosDir($productId);

        foreach($files as $file) {
            $file->store($dir, ['disk' => env('FILESYSTEM_DRIVER')]);
        }
    }

    private static function createPhotosModels(int $productId, array $files)
    {
        $photos = [];

        foreach($files as $file) {
            $photos[] = self::create([
                'file_name' => $file->hashName(),
                'product_id' => $productId
            ]);
        }

        return $photos;
    }

    public function getPhotoUrlAttribute()
    {
        //$path = self::photosDir($this->product_id);
        //return asset("storage/{$path}/{$this->file_name}");

        $path = self::photosDir($this->product_id);
        $fileSystemDriver = env('FILESYSTEM_DRIVER');
        return $fileSystemDriver == 'local' ? asset("storage/{$path}/{$this->file_name}") : Storage::disk($fileSystemDriver)->url($this->photo_url_without_asset);
    }

    public function getPhotoUrlWithoutAssetAttribute()
    {
        $path = self::photosDir($this->product_id);
        return "{$path}/{$this->file_name}";
    }

    public static function photosDir(int $productId)
    {
        $dir = self::DIR_PRODUCTS;
        return "{$dir}/{$productId}";
    }    

    public function product()
    {
        return $this->belongsTo(Product::class)->withTrashed();
    }

}
