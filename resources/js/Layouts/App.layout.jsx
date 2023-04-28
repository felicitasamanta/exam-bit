import 'bootstrap/dist/css/bootstrap.css';
import {Link, usePage} from "@inertiajs/react";

export default function AppLayout({children}) {
    const {auth} = usePage().props;
    const user = auth.user;

    return (
        <div className="container mb-5 px-3">
            <div className="row">
                <nav className="navbar bg-body-tertiary">
                    <div className="container-fluid">
                        <div className="d-flex align-items-center gap-3 ">
                            <h1 className="navbar-brand">Books reservation app</h1>
                        </div>
                        {user == null ?
                            <div className="float-end">
                                <Link className="btn btn-info " href={route("register")}>Register</Link>
                            </div>
                            :
                            <div className="">
                                <Link className='btn btn-link text-warning' href={route('books.index')}>Books</Link>
                                {user.type ===1 && <Link className='btn btn-link text-warning' href={route('categories.index')}>Categories</Link>}
                                <div className="float-end">
                                        <span>You are logged in as: <b>{user.name} ({user.type === 1 ? "administrator" : "\n" +
                                            "reader"})</b> </span>
                                    <Link className="btn btn-warning " href={route('logout')} as="button"
                                          method="post">Logout</Link>
                                </div>
                            </div>
                        }
                    </div>
                </nav>
                {children}
            </div>
        </div>
    );
}
