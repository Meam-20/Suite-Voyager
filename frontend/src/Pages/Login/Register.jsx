import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from 'sweetalert2';

const Register = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const { createUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleRegister = e => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const name = form.get("name");
        const photo = form.get("photo");
        const email = form.get("email");
        const password = form.get("password");

        setErrorMessage('');

        if (password.length < 6) {
            setErrorMessage('Password must be at least 6 characters');
            return;
        } else if (!/[A-Z]/.test(password)) {
            setErrorMessage('Password must contain at least one uppercase letter');
            return;
        } else if (!/[!@#$%^&*]/.test(password)) {
            setErrorMessage('Password must contain at least one special character');
            return;
        }

        createUser(email, password)
            .then(result => {
                // User save to Database logic
                const userInfo = {
                    name,
                    email,
                    photo,
                    role: 'user' // Default role
                };

                fetch('http://localhost:5000/users', {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(userInfo)
                })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId || data._id) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Registration Successful',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate('/');
                    }
                });
            })
            .catch((error) => {
                setErrorMessage(error.message);
            });
    };

    return (
        <div className="hero min-h-screen my-8 w-11/12 mx-auto rounded-lg bg-[#1E2C1A]">
            <div className="hero-content flex flex-col ">
                <div className="text-center">
                    <h1 className="text-5xl font-bold text-white"><span className="text-[#D49B35]">Register</span> now!</h1>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mt-5">
                    <form onSubmit={handleRegister} className="card-body">
                        <div className="form-control">
                            <label className="label"><span className="label-text">Name</span></label>
                            <input type="text" name="name" placeholder="Your Name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Photo URL</span></label>
                            <input type="text" name="photo" placeholder="photo url" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Email</span></label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Password</span></label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn bg-[#D49B35] border-none text-white hover:bg-[#b8862d]">Register</button>
                            {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
                            <p className="mt-5 text-xs text-center">Already have an account? <Link to='/login' className="text-[#D49B35] font-bold">Login Now!</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;