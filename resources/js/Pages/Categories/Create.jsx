import AppLayout from "@/Layouts/App.layout";
import {useState} from "react";
import {router} from "@inertiajs/react";

export default function Create(props) {
    const [values, setValues] = useState({
        name: "",
    });

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.id]: event.target.value
        })
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        router.post(route("categories.store"), values);
        setValues({
            name: "",
        });
    }
    return (

        <AppLayout>
            <div className="col-md-6 col-lg-4 mx-auto mt-5">
                <div className="card">
                    <div className="card-header">Add new category</div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input className="form-control" type="text" id="name" onChange={handleChange}
                                       value={values.name}/>
                            </div>
                            <button className="btn btn-success w-50">Add</button>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>


    )
}




