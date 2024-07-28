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
        Schema::create('task', function (Blueprint $table){
            $table->id();
            $table->string('title');
            $table->string('content');
            $table->softDeletes();
            $table->timestamps();

            $table->UnsignedBigInteger('id_category');
            $table->foreign('id_category')->references('id')->on('category');
            $table->unique(['title', 'content']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
