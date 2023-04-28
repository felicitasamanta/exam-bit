import AppLayout from "@/Layouts/App.layout";
import {Link, router, usePage} from "@inertiajs/react";
import {useState} from "react";
export default function Index({order, books, categories, filter: filterProp}) {
    const {auth} = usePage().props;
    const user = auth.user;
    const [filter, setFilter] = useState({
        title: filterProp.title
    });
    const handleChange = (e) => {
        setFilter({
            ...filter,
            [e.target.id]: e.target.value,
        });
    }

    const handleFilter = (newOrder) => {
        router.get(route("books.index"), {...filter, date: newOrder || order});
    }
    const handleClear = () => {
        router.get(route("books.index"));
    }

    const categoryOptions = [];
    categoryOptions.push(<option key="0" value="Filter by categories">Filter by categories</option>);
    categories.forEach((category) => {
        categoryOptions.push(<option key={category.id} value={category.id}>{category.name}</option>);
    });
    const renderBooks = () => {
        return books.map((book) => (
          <Link key={book.id} href={route('books.edit', book.id)}>
            <div key={'book.id'} className='mx-auto border border-dark rounded py-3 px-4 bg-white col-lg-8  col-md-8 col-sm-10'>
                <div className="d-flex">
                    <div className="col-7">
                        <div className="fs-6">{book?.category?.name}</div>
                        <div className="fw-bold fs-4 mb-3">{book.title}, {book.pages} pages</div>
                        <div className="">
                            {book.picture &&
                                <img alt='picture' height="150px" width="150px" src={"/storage/books/" + book.picture}/>
                            }
                        </div>
                    </div>
                    <div className='col-4'>
                        {book.summary}
                    </div>
                </div>
            </div>
            </Link>
        ));
    };

    return (
        <AppLayout>
            <div className="col-lg-8 col-12-md mx-auto mt-5 d-flex flex-column gap-3">
                {user.type ===1 && <Link  href={route('books.create')} className='btn btn-primary col-3 float-end'>Add new book</Link>}
                <div className='col-lg-6 mx-auto'>
                    <input id="title" type="text" className="form-control col-6 mb-3" value={filter.title || ""} placeholder="Filter by title" onChange={handleChange}/>
                    <select id="category_id" className="form-select col-6 mb-3" value={filter.category_id || ""} onChange={handleChange}>
                        {categoryOptions}
                    </select>
                    <div className="d-flex col-12 justify-content-center gap-3">
                        <button className='btn btn-primary col-lg-3 col-md-6' onClick={() => handleFilter()}>Filter</button>
                        <button className="btn btn-success col-lg-3 col-md-6 " onClick={handleClear}>Clear</button>
                    </div>
                </div>
                <hr/>
                {renderBooks()}
            </div>
        </AppLayout>
    );
}
