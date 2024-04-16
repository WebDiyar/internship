import { useState, FormEvent } from "react";
import { createUserWithEmailAndPassword, Auth } from "firebase/auth";
import { auth, db } from "../../firebase";
import { Navigate } from "react-router-dom";
import { doc, setDoc } from 'firebase/firestore';
import { useDispatch } from "react-redux";
import { setUser } from "../../store/authSlice";

const SignUp = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const dispatch = useDispatch();

    const signUp = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth as Auth, email, password);
            console.log("SignUp Success:", userCredential);

            if (userCredential.user) {
                const userData = { email: userCredential.user.email, uid: userCredential.user.uid };
                dispatch(setUser(userData));
                await setDoc(doc(db, "users", userCredential.user.uid), userData);
            }
            setSuccess(true);
        } catch (error) {
            console.error("SignUp Error:", error);
            setError("Failed to create account. Please try again.");
        }
    };

    if (success) {
        return <Navigate to="/" />
    }

    return (
        <div className="sign-up-container">
            <form onSubmit={signUp}>
                <h1>Create Account</h1>
                <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                {error && <p>{error}</p>}
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;
