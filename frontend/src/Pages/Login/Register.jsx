// React এবং প্রয়োজনীয় hooks import করা
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from 'sweetalert2';

const Register = () => {
    const [errorMessage, setErrorMessage] = useState(''); // Error message state
    const { createUser } = useContext(AuthContext); // AuthContext থেকে createUser function নেওয়া
    const navigate = useNavigate(); // Navigation এর জন্য

    // Registration form handle করার function
    const handleRegister = e => {
        e.preventDefault(); // Form এর default behavior বন্ধ করা
        const form = new FormData(e.currentTarget);
        // Form থেকে সব data নেওয়া
        const name = form.get("name");
        const photo = form.get("photo");
        const email = form.get("email");
        const password = form.get("password");

        setErrorMessage(''); // পুরানো error message clear করা

        // Password validation - কমপক্ষে ৬ character
        if (password.length < 6) {
            setErrorMessage('Password must be at least 6 characters');
            return;
        } 
        // Password এ কমপক্ষে একটি বড় হাতের অক্ষর থাকতে হবে
        else if (!/[A-Z]/.test(password)) {
            setErrorMessage('Password must contain at least one uppercase letter');
            return;
        } 
        // Password এ কমপক্ষে একটি বিশেষ চিহ্ন থাকতে হবে
        else if (!/[!@#$%^&*]/.test(password)) {
            setErrorMessage('Password must contain at least one special character');
            return;
        }

        // Firebase এ user account তৈরি করা
        createUser(email, password)
            .then(result => {
                // Database এ user save করার জন্য user info object তৈরি
                const userInfo = {
                    name,
                    email,
                    photo,
                    role: 'user' // Default role set করা
                };

                // Backend API তে POST request পাঠানো
                fetch('http://localhost:5000/users', {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(userInfo)
                })
                .then(res => res.json())
                .then(data => {
                    // Database এ successfully save হলে
                    if (data.insertedId || data._id) {
                        // Success message দেখানো
                        Swal.fire({
                            icon: 'success',
                            title: 'Registration Successful',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        // Home page এ redirect করা
                        navigate('/');
                    }
                });
            })
            .catch((error) => {
                // Firebase error হলে error message set করা
                setErrorMessage(error.message);
            });
    };

    return (
        // Registration page এর main container
        <div className="hero min-h-screen my-8 w-11/12 mx-auto rounded-lg bg-[#1E2C1A]">
            <div className="hero-content flex flex-col ">
                {/* Registration page এর title */}
                <div className="text-center">
                    <h1 className="text-5xl font-bold text-white"><span className="text-[#D49B35]">Register</span> now!</h1>
                </div>
                {/* Registration form card */}
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mt-5">
                    <form onSubmit={handleRegister} className="card-body">
                        {/* Name input field */}
                        <div className="form-control">
                            <label className="label"><span className="label-text">Name</span></label>
                            <input type="text" name="name" placeholder="Your Name" className="input input-bordered" required />
                        </div>
                        {/* Photo URL input field */}
                        <div className="form-control">
                            <label className="label"><span className="label-text">Photo URL</span></label>
                            <input type="text" name="photo" placeholder="photo url" className="input input-bordered" required />
                        </div>
                        {/* Email input field */}
                        <div className="form-control">
                            <label className="label"><span className="label-text">Email</span></label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        {/* Password input field */}
                        <div className="form-control">
                            <label className="label"><span className="label-text">Password</span></label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                        </div>
                        {/* Register button এবং error message */}
                        <div className="form-control mt-6">
                            {/* Registration submit button */}
                            <button className="btn bg-[#D49B35] border-none text-white hover:bg-[#b8862d]">Register</button>
                            {/* Error message display */}
                            {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
                            {/* Login page এর link */}
                            <p className="mt-5 text-xs text-center">Already have an account? <Link to='/login' className="text-[#D49B35] font-bold">Login Now!</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;