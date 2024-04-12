import { createUserWithEmailAndPassword, Auth } from "firebase/auth";
import { useState, FormEvent } from "react";
import { auth } from "../../firebase";
import { Navigate } from "react-router-dom";

const SignUp = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [success, setSuccess] = useState<boolean>(false);

    const signUp = (e: FormEvent) => {
        e.preventDefault();

        console.log("Attempting to sign up with:", email, password);

        createUserWithEmailAndPassword(auth as Auth, email, password)
            .then((result) => {
                console.log("SignUp Success:", result);
                setSuccess(true);
            })
            .catch((error) => {
                console.error("SignUp Error:", error);
            });
    };

    if (success) {
        return <Navigate to="/signIn" />
    }

    return (
        <div className="sign-in-container">
            <form onSubmit={signUp}>
                <h1>Create Account</h1>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;
