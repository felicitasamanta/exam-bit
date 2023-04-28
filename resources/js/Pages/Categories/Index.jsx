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
            <td>{category.name}</td>
            <td className="text-center">
                <Link className="btn btn-primary" href={route('categories.edit', category.id)}>Edit</Link>
            </td>
            <td>
                <button className="btn btn-danger text-center" onClick={handleDelete} value={category.id}>Delete
                </button>
            </td>
        </tr>)
    });

    return (

        <AppLayout>
            <div className="col-md-8 mt-5 mx-auto">
                <div className="card">
                    <div className="card-header">Categories list</div>
                    <div className="card-body">
                        <Link className="btn btn-success float-end" href={route("categories.create")}>Add new category</Link>
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


