<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table){
            $table->id();
            $table->string('title');
            $table->string('content');
            $table->boolean('done')->default(false);
            $table->timestamp('finished_at')->nullable();
            $table->softDeletes();
            $table->timestamps();

            $table->UnsignedBigInteger('id_user');
            $table->foreign('id_user')->references('id')->on('users');
            $table->unique(['title', 'content']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
