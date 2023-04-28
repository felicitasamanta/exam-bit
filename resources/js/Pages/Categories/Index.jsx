import AppLayout from "@/Layouts/App.layout";
import {Link, router} from "@inertiajs/react";
import {useState} from "react";

export default function Index({categories}) {

    const categoriesList = [];

    const handleDelete = (event) => {
        router.delete(route('categories.destroy', event.target.value));
    }

    const [order, setOrder] = useState({
        field: "name", dir: 1
    });


    categories.sort((a, b) => {
        if (a[order.field] > b[order.field]) {
            return order.dir;
        }
        if (a[order.field] < b[order.field]) {
            return -1 * order.dir;
        }
        return 0;
    });

    const toggleOrder = (field) => {
        setOrder({
            field: field,
            dir: 1 ? -1  : 1,
        });
    };

    categories.forEach((category) => {
        categoriesList.push(<tr key={category.id}>
            <td className='col-4'>{category.name}</td>
            <td className="col-7 mx-auto d-flex gap-3">
                <Link className="btn btn-info col-6" href={route('categories.edit', category.id)}>Edit</Link>
                <button className="btn btn-danger text-center col-6" onClick={handleDelete} value={category.id}>Delete
                </button>
            </td>
        </tr>)
    });

    return (

        <AppLayout>
            <div className="col-md-6 col-lg-5 mt-5 mx-auto text-center">
                <div className="card">
                    <div className="card-header">Categories list</div>
                    <div className="m-3 ">
                        <Link className="btn btn-primary float-start" href={route("categories.create")}>Add new category</Link>
                    </div>
                    <div className="card-body">
                        <table className="table">
                            <thead>
                            <tr>
                                <th><span onClick={() => {
                                    setOrder({field: "name", dir: 1})
                                }} >Name</span></th>
                                <th colSpan="2" className="text-center">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {categoriesList}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
)}


