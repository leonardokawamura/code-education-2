<?php

namespace App\Http\Resources;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Pagination\AbstractPaginator;

class ChatGroupUserResource extends JsonResource
{
    private $users;

    public function __construct($resource, $users = null)
    {
        parent::__construct($resource);
        $this->users = $users;
    }
    
    
    public function toArray($request)
    {
        //self::withoutWrapping();
        return $this->makeArray($request);
    }

    protected function getChatGroup()
    {
        $chat_group = $this->resource;
        $chat_group->users_count = $this->resource->users()->count();
        return $chat_group;
    }

    protected function makeArray($request)
    {
        $chatGroup = $this->getChatGroup();
        $array = [
            'data' => [
                'chat_group' => new ChatGroupResource($chatGroup)
            ]
        ];
        $userResponse = $this->getUserResponse($request);
        if($userResponse instanceof JsonResponse) {
            $data = $userResponse->getData();
            $array['data']['users'] = $data->data;
            $array['links'] = $data->links;
            $array['meta'] = $data->meta;
        } else {
            $array['data']['users'] = $userResponse;
        }
        return $array;
    }

    protected function getUserResponse($request)
    {
        $users = $this->users ? $this->users : $this->resource->users()->paginate(1);
        return $users instanceof AbstractPaginator ? 
            UserResource::collection($users)->toResponse($request) : 
            UserResource::collection($users);
    }
    
    
    
    
    
    
}
