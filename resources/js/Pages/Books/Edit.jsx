import AppLayout from "@/Layouts/App.layout";
import {router, useForm, usePage} from "@inertiajs/react";
export default function Edit(props) {
    const {errors} = usePage().props;
    const {data, setData} = useForm(props.book);

    const onDelete = (e, id) => {
        e.preventDefault();
        router.delete(route("books.destroy", id))
    }
    const handleChange = (e)=> {
        setData({
            ...data,
            [e.target.id]: e.target.value,
        })
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        router.post(route("books.update", data.id), data);
    }

    const categoryOptions = [];
    categoryOptions.push(<option key="0" value="Select category">Select category</option>);
    props.categories.forEach((category) => {
        categoryOptions.push(<option key={category.id} value={category.id}>{category.name}</option>);
    });
    return (

        <AppLayout>
            <div className="col-lg-8 col-12-md mx-auto mt-5">
                <div className="card">
                    <div className="card-header">Edit book:</div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="title">Title:</label>
                                <input type="text" className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                       id="title" value={data.title}
                                       onChange={handleChange}/>
                                {errors.title && <div className="invalid-feedback">{errors.title}</div>}

                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="summary">Summary:</label>
                                <input type="text" className={`form-control ${errors.summary ? 'is-invalid' : ''}`}
                                       id="summary" value={data.summary}
                                       onChange={handleChange}/>
                                {errors.summary && <div className="invalid-feedback">{errors.summary}</div>}

                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="ISBN">ISBN:</label>
                                <input type="text" className={`form-control ${errors.ISBN ? 'is-invalid' : ''}`}
                                       id="ISBN" value={data.ISBN}
                                       onChange={handleChange}/>
                                {errors.ISBN && <div className="invalid-feedback">{errors.ISBN}</div>}

                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="picture">Picture:</label>
                                <input type="file" className={`form-control ${errors.picture ? 'is-invalid' : ''}`}
                                       id="picture"
                                       onChange={(e)=>setData({...data, picture:e.target.files[0]})} />
                                {errors.picture && <div className="invalid-feedback">{errors.picture}</div>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="pages">Pages:</label>
                                <input type="text" className={`form-control ${errors.pages ? 'is-invalid' : ''}`}
                                       id="pages" value={data.pages}
                                       onChange={handleChange}/>
                                {errors.pages && <div className="invalid-feedback">{errors.pages}</div>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="category_id">Category </label>
                                <select className='form-control'
                                        onChange={handleChange} value={data.category_id}>
                                    {categoryOptions}
                                </select>
                            </div>
                            <button className="btn btn-success w-50 mx-auto" type="submit" >Update</button>
                        </form>
                        <button type="button" className='btn btn-danger mt-3 w-50 text-center' onClick={(e) => onDelete(e, data.id)}>Delete</button>
                    </div>
                </div>
            </div>
        </AppLayout>


    )
}

