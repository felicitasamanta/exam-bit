<?php

use App\Http\Controllers\BookController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/books/index', [BookController::class, 'index'])->name('books.index');
});

Route::get('/', function () {
    return Inertia::render('Auth/Login');
});

Route::get('/dashboard', function () {
    return Inertia::render('Welcome');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::group(['middleware' => 'admin'], function () {
    Route::get('/books/{id}/edit', [BookController::class, 'edit'])->name('books.edit');
    Route::post('/books/{id}/edit', [BookController::class, 'update'])->name('books.update');
    Route::delete('/books/{id}/delete', [BookController::class, 'destroy'])->name('books.destroy');
    Route::post('/books/create', [BookController::class, 'store'])->name('books.store');
    Route::get('books/create', [BookController::class, 'create'])->name('books.create');
    Route::resource('/categories', CategoryController::class);
});

require __DIR__ . '/auth.php';
