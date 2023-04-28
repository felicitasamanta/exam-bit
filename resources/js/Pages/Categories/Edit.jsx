import AppLayout from "@/Layouts/App.layout";
import {useState} from "react";
import {router} from "@inertiajs/react";

export default function Create(props) {

    const [values, setValues] = useState(props.category);

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.id]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        router.put(route("categories.update", values.id), values);
    }
    return (
        <AppLayout>
            <div className="col-md-6 mx-auto mt-5">
                <div className="card">
                    <div className="card-header">Update</div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input className="form-control" type="text" id="name" onChange={handleChange}
                                       value={values.name}/>
                            </div>
                            <button className="btn btn-success w-100">Save updates</button>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}




