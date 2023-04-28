import {useEffect} from 'react';
import InputError from '../../../../../laravel_breeze/resources/js/Components/InputError';
import {Head, Link, useForm} from '@inertiajs/react';
import AppLayout from "@/Layouts/App.layout";


export default function Register() {
    const {data, setData, post, processing, errors, reset} = useForm({
        name: '', email: '', password: '', password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (<AppLayout>
        <Head title="Register"/>
        <div className="col-md-6 offset-md-3 mt-5">
            <main className="form-signin w-100 m-auto">
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={submit}>
                            <h1 className="h3 mb-3 fw-normal">Please register</h1>
                            <div className="mb-3">
                                <label className="form-label">
                                    Name
                                </label>

                                <input
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                <InputError message={errors.name} className="mt-2"/>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    Email
                                </label>

                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="form-control"
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />

                                <InputError message={errors.email} className="mt-2"/>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    Password
                                </label>

                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="form-control"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />

                                <InputError message={errors.password} className="mt-2"/>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    Confirm password
                                </label>

                                <input
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="form-control"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    required
                                />

                                <InputError message={errors.password_confirmation} className="mt-2"/>
                            </div>

                            <div className="flex items-center gap-3 mt-4">
                                <button className="btn btn-success" disabled={processing}>
                                    Register
                                </button>
                                <Link
                                    href={route('login')}
                                    className="btn btn-primary float-end"
                                >
                                    Already registered?
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>


    </AppLayout>);
}
