<?php

use App\Http\Controllers\ChatInvitationUserController;
use App\Models\ChatGroupInvitation;
use App\Models\ChatInvitationUser;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateChatInvitationUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('chat_invitation_users', function (Blueprint $table) {
            $table->increments('id');
            $table->smallInteger('status')->default(ChatInvitationUser::STATUS_PENDING);
            $table->integer('invitation_id')->unsigned();
            $table->foreign('invitation_id')->references('id')->on('chat_group_invitations');
            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('chat_invitation_users');
    }
}
