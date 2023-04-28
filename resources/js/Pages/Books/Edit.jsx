import AppLayout from "@/Layouts/App.layout";
import {router, useForm, usePage} from "@inertiajs/react";

export default function Edit(props) {
    const {errors} = usePage().props;

    const {data, setData} = useForm(props.post);

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
                                <label className="form-label" htmlFor="category">Category:</label>
                                <input type="text" className={`form-control ${errors.category ? 'is-invalid' : ''}`}
                                       id="category" value={data.category}
                                       onChange={handleChange}/>
                                {errors.category && <div className="invalid-feedback">{errors.category}</div>}
                            </div>
                            <button className="btn btn-primary w-100" type="submit">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>


    )
}

