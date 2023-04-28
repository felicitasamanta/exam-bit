<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Category;
use Illuminate\Http\Request;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $parameters = $request->query->all();
        $filter = new \stdClass();
        $filter->title = $parameters["title"] ?? "";

        return inertia('Books/Index', [
            "books" => Book::filter($filter)->with('category')->get(),
            "categories" => Category::all(),
            "filter" => $filter,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        return inertia('Books/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => ['required'],
            'summary' => ['required'],
            'ISBN' => ['required'],
            'picture' => ['required'],
            'pages' => ['required'],
        ],
            [
                "title.required" => "The title field is required.",
                "summary.required" => "The summary field is required.",
                "ISBN.required" => "The ISBN field is required.",
                "picture.required" => "The picture field is required.",
                "pages.required" => "The pages field is required.",
            ]);

        $book = new Book();
        $book->title = $request->title;
        $book->summary = $request->summary;
        $book->ISBN = $request->ISBN;
        $book->pages = $request->pages;
        if ($request->file('picture') != null) {
            $request->file('picture')->store("public/books");
            $book->picture = $request->file('picture')->hashName();
        }

        $book->save();
        return to_route('books.index');
    }
    /**
     * Display the specified resource.
     */
    public function show(Book $book)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(int $book_id)
    {

        return inertia('Books/Edit', [
            "book"=>Book::with('category')->find(\request($book_id))
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $book_id)
    {
        $request->validate([
            'title' => ['required'],
            'summary' => ['required'],
            'ISBN' => ['required'],
            'picture' => ['required'],
            'pages' => ['required'],
        ],
            [
                "title.required" => "The title field is required.",
                "summary.required" => "The summary field is required.",
                "ISBN.required" => "The ISBN field is required.",
                "picture.required" => "The picture field is required.",
                "pages.required" => "The pages field is required.",
            ]);

        $book = Book::with('category')->find($request->$book_id);
        $book->title = $request->title;
        $book->summary = $request->summary;
        $book->ISBN = $request->ISBN;
        $book->pages = $request->pages;


        if ($request->file('picture') != null) {
            if ($book->picture != null) {
                unlink(storage_path() . "/app/public/books/" . $book->picture);
            }
            $request->file('picture')->store("public/books");
            $book->picture = $request->file('picture')->hashName();
        }

        $book->update();
        return redirect()->route('books.index');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $book_id)
    {
        Book::destroy($book_id);
        return to_route('books.index');
    }
}
