<?php

namespace App\Http\Controllers\Api;

use App\Common\OnlyTrashed;
use App\Events\UserCreatedEvent;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Filters\UserFilter;
use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;

class UserController extends Controller
{
    use OnlyTrashed;

    public function index(Request $request)
    {        
        $query = User::query();
        $query = $this->onlyTrashedIfRequested($request, $query);
        
        /** @var UserFilter $filter */        
        $filter = app(UserFilter::class);

        /** @var Builder $filterQuery */
        //$filterQuery = User::filtered($filter);
        $filterQuery = $query->filtered($filter);
       
        $users = $filter->hasFilterParameter() ? $filterQuery->get() : $filterQuery->paginate(5);          
        
        return UserResource::collection($users);
    }

    public function store(UserRequest $request)
    {
        $user = User::create($request->all());
        event(new UserCreatedEvent($user));
        return new UserResource($user);
    }

    public function show(User $user)
    {
        return new UserResource($user);
    }

    public function update(UserRequest $request, User $user)
    {
        $user->fill($request->all());
        $user->save();
        return new UserResource($user);
    }

    public function destroy(User $user)
    {
        $user->delete();
        return response()->json([], 204);
    }

    public function restore(User $user)
    {
        $user->restore();
        return response()->json([], 204);
    }
}
