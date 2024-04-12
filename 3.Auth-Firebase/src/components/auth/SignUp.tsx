import { useState, FormEvent } from "react";
import { createUserWithEmailAndPassword, Auth } from "firebase/auth";
import { auth } from "../../firebase";
import { Navigate } from "react-router-dom";

const SignUp = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const signUp = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const result = await createUserWithEmailAndPassword(auth as Auth, email, password);
            console.log("SignUp Success:", result);
            setSuccess(true);
        } catch (error) {
            console.error("SignUp Error:", error);
            setError("Failed to create account. Please try again.");
        }
    };

    if (success) {
        return <Navigate to="/signIn" />
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
