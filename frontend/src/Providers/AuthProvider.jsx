// Firebase authentication এবং React এর প্রয়োজনীয় imports
import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import { PropTypes } from 'prop-types';
import { GoogleAuthProvider } from "firebase/auth";
import app from '../firebase/firebase.config';

// Authentication context তৈরি করা
export const AuthContext = createContext(null);

// Firebase auth instance তৈরি করা
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null); // Current user state
    const [loading, setLoading] = useState(true); // Loading state
    const provider = new GoogleAuthProvider(); // Google auth provider

    // নতুন user registration করার function
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // Email/Password দিয়ে login করার function
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    
    // Google দিয়ে login করার function
    const handleGoogleSignIn = () => {
        return signInWithPopup(auth, provider); // Promise return করা হচ্ছে
    }

    // Logout করার function
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    // User এর authentication state monitor করা
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            console.log('Auth state changed', currentUser);
            setUser(currentUser); // Current user set করা
            setLoading(false); // Loading false করা
        });
        // Cleanup function
        return () => {
            unSubscribe();
        }
    }, [])

    // Context এ pass করার জন্য সব functions একসাথে
    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logOut,
        handleGoogleSignIn,
    }

    // Context Provider দিয়ে সব children components এ authInfo pass করা
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

// PropTypes validation
AuthProvider.propTypes ={
    children:PropTypes.object,
}

export default AuthProvider;