import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";

const Login = () => {
    const { signIn, handleGoogleSignIn } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const from = location?.state ? location.state : '/';

    const saveUserToDB = (user) => {
        const userInfo = {
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
            role: 'user'
        };
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(userInfo)
        })
        .then(res => res.json())
        .then(() => {
            navigate(from, { replace: true });
        });
    };

    const handleLogin = e => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const email = form.get('email');
        const password = form.get('password');

        setErrorMessage('');

        signIn(email, password)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    timer: 1500
                });
                navigate(from, { replace: true });
            })
            .catch(error => {
                setErrorMessage(error.message);
            });
    };

    const onGoogleSignIn = () => {
        handleGoogleSignIn()
            .then(result => {
                saveUserToDB(result.user);
            })
            .catch(error => setErrorMessage(error.message));
    };

    return (
        <div className="hero min-h-screen my-8 w-11/12 mx-auto rounded-lg bg-[#1E2C1A]">
            <div className="hero-content flex flex-col ">
                <div className="text-center">
                    <h1 className="text-5xl font-bold text-white"><span className="text-[#D49B35]">Login</span> now!</h1>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mt-5">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label"><span className="label-text">Email</span></label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Password</span></label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn bg-[#D49B35] border-none text-white hover:bg-[#b8862d] mb-2">Login</button>
                            <button type="button" onClick={onGoogleSignIn} className="btn btn-outline border-[#D49B35] text-[#D49B35] hover:bg-[#D49B35] hover:border-none">
                                Login With Google
                            </button>
                            {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
                            <p className="mt-5 text-xs text-center"> Don't have an account? <Link to='/register' className="text-[#D49B35] font-bold">Register Now!</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;