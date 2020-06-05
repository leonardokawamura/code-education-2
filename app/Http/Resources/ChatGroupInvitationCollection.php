<?php

namespace App\Http\Resources;

use App\Models\ChatGroup;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ChatGroupInvitationCollection extends ResourceCollection
{
    private $group;

    public function __construct($resource, ChatGroup $group)
    {
        $this->group = $group;
        parent::__construct($resource);
    }

    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'group' => new ChatGroupResource($this->group),
            'link_invitations' => $this->collection->map(function($invitation) {
                return new ChatGroupInvitationResource($invitation, true);
            })
        ];
    }
}
