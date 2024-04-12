import { Link } from 'react-router-dom';

const Main = () => {
    return (
        <div>
            <h1 style={{marginBottom: 10}}>Hello User</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/signIn">Sign In</Link>
                    </li>
                    <li>
                        <Link to="/signUp">Sign Up</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Main;
