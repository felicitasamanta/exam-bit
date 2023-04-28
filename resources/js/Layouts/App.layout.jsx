import 'bootstrap/dist/css/bootstrap.css';
import {Link, usePage} from "@inertiajs/react";

export default function AppLayout({children}) {
    const {auth} = usePage().props;
    const user = auth.user;

    return (
        <div className="container mb-5">
            <div className="row">
                <nav className="navbar bg-body-tertiary">
                    <div className="container-fluid">
                        <div className="d-flex align-items-center gap-3 ">
                            <Link className="navbar-brand" href={route('login')}>Books reservation app</Link>
                            {/*<Link href={route("posts.index")} className="nav-link ">Posts</Link>*/}
                            {/*<Link href={route("posts.acc")} className="nav-link float-end ">Profile</Link>*/}
                        </div>
                        {user == null ?
                            <div className="float-end">
                                {/*<Link className="btn btn-primary mr-3 " href={route("login")}>Login</Link>*/}
                                {/*&nbsp;*/}
                                <Link className="btn btn-info " href={route("register")}>Register</Link>
                            </div>
                            :
                            <div className="">
                                <Link className='btn btn-link' href={route('books.index')} >Books</Link>
                                <Link className='btn btn-link' href={route('categories.index')} >Categories</Link>
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
