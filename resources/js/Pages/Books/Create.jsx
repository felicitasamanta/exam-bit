import AppLayout from "@/Layouts/App.layout";
import {router, useForm, usePage} from "@inertiajs/react";
export default function Create({categories}) {
    const {data, setData} = useForm({
        title: "",
        description: "",
        text: "",
        picture: null,
        date: "",
        category_id: null
    });
    const {errors} = usePage().props;

    function handleChange(e) {
        setData({
            ...data,
            [e.target.id]: e.target.value,
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        router.post(route("books.store"), data);
    }

    const categoryOptions = [];
    categoryOptions.push(<option key="0" value="Select category">Select category</option>);
    categories.forEach((category) => {
        categoryOptions.push(<option key={category.id} value={category.id}>{category.name}</option>);
    });

    return (
        <AppLayout>
            <div className="mx-auto col-lg-6 col-md-8 col-sm-10 mt-5">
                <div className="card">
                    <div className="card-header">Add new book</div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="title">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    className={`form-control ${
                                        errors.title ? "is-invalid" : ""
                                    }`}
                                    id="title"
                                    defaultValue={data.title}
                                    onChange={handleChange}
                                />
                                {errors.title && (
                                    <div className="invalid-feedback">{errors.title}</div>
                                )}
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="summary">
                                    Summary
                                </label>
                                <input
                                    type="text"
                                    className={`form-control ${
                                        errors.summary ? "is-invalid" : ""
                                    }`}
                                    id="summary"
                                    defaultValue={data.summary}
                                    onChange={handleChange}
                                />
                                {errors.summary && (
                                    <div className="invalid-feedback">{errors.summary}</div>
                                )}
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="ISBN">
                                    ISBN:
                                </label>
                                <input
                                    type="text"
                                    className={`form-control ${
                                        errors.ISBN ? "is-invalid" : ""
                                    }`}
                                    id="ISBN"
                                    defaultValue={data.ISBN}
                                    onChange={handleChange}
                                />
                                {errors.ISBN && (
                                    <div className="invalid-feedback">{errors.ISBN}</div>
                                )}
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="picture">
                                    Picture:
                                </label>
                                <input
                                    type="file"
                                    className={`form-control ${
                                        errors.picture ? "is-invalid" : ""
                                    }`}
                                    id="picture"
                                    onChange={(e) =>
                                        setData({...data, picture: e.target.files[0]})
                                    }
                                />
                                {errors.picture && (
                                    <div className="invalid-feedback">{errors.picture}</div>
                                )}
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="pages">
                                    Pages:
                                </label>
                                <input
                                    type="text"
                                    className={`form-control ${
                                        errors.pages ? "is-invalid" : ""
                                    }`}
                                    id="pages"
                                    defaultValue={data.pages
                                    }
                                    onChange={handleChange}
                                />
                                {errors.pages && (
                                    <div className="invalid-feedback">{errors.pages}</div>
                                )}
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="category_id">Category </label>
                                <select className='form-control'
                                        onChange={handleChange} value={data.category_id}>
                                    {categoryOptions}
                                </select>
                            </div>
                            <div className="mt-3">
                                <button type="submit" className="btn btn-success w-50">
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

