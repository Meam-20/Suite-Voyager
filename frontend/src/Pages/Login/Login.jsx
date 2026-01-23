// React এবং প্রয়োজনীয় hooks import করা
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";

const Login = () => {
    // AuthContext থেকে login functions নেওয়া
    const { signIn, handleGoogleSignIn } = useContext(AuthContext);
    const location = useLocation(); // বর্তমান location পাওয়ার জন্য
    const navigate = useNavigate(); // navigation এর জন্য
    const [errorMessage, setErrorMessage] = useState(''); // error message state

    // Login এর পর কোথায় redirect করবে তা নির্ধারণ
    const from = location?.state ? location.state : '/';

    // Google login এর পর user কে database এ save করার function
    const saveUserToDB = (user) => {
        // User এর তথ্য object আকারে তৈরি করা
        const userInfo = {
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
            role: 'user'
        };
        // Backend API তে POST request পাঠানো
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(userInfo)
        })
        .then(res => res.json())
        .then(() => {
            // Success হলে redirect করা
            navigate(from, { replace: true });
        });
    };

    // Email/Password দিয়ে login handle করার function
    const handleLogin = e => {
        e.preventDefault(); // Form এর default behavior বন্ধ করা
        const form = new FormData(e.currentTarget);
        const email = form.get('email'); // Email field থেকে value নেওয়া
        const password = form.get('password'); // Password field থেকে value নেওয়া

        setErrorMessage(''); // পুরানো error message clear করা

        // Firebase signIn function call করা
        signIn(email, password)
            .then(() => {
                // Success হলে SweetAlert দিয়ে message দেখানো
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    timer: 1500
                });
                // Login এর পর redirect করা
                navigate(from, { replace: true });
            })
            .catch(error => {
                // Error হলে error message set করা
                setErrorMessage(error.message);
            });
    };

    // Google দিয়ে login করার function
    const onGoogleSignIn = () => {
        handleGoogleSignIn()
            .then(result => {
                // Google login success হলে user কে database এ save করা
                saveUserToDB(result.user);
            })
            .catch(error => setErrorMessage(error.message)); // Error handle করা
    };

    return (
        // Login page এর main container
        <div className="hero min-h-screen my-8 w-11/12 mx-auto rounded-lg bg-[#1E2C1A]">
            <div className="hero-content flex flex-col ">
                {/* Login page এর title */}
                <div className="text-center">
                    <h1 className="text-5xl font-bold text-white"><span className="text-[#D49B35]">Login</span> now!</h1>
                </div>
                {/* Login form card */}
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mt-5">
                    <form onSubmit={handleLogin} className="card-body">
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
                        {/* Login buttons এবং error message */}
                        <div className="form-control mt-6">
                            {/* Email/Password login button */}
                            <button className="btn bg-[#D49B35] border-none text-white hover:bg-[#b8862d] mb-2">Login</button>
                            {/* Google login button */}
                            <button type="button" onClick={onGoogleSignIn} className="btn btn-outline border-[#D49B35] text-[#D49B35] hover:bg-[#D49B35] hover:border-none">
                                Login With Google
                            </button>
                            {/* Error message display */}
                            {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
                            {/* Register page এর link */}
                            <p className="mt-5 text-xs text-center"> Don't have an account? <Link to='/register' className="text-[#D49B35] font-bold">Register Now!</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;