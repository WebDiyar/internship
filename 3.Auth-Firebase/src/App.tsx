import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Main from './components/Main';
import UserDashboard from './components/UserDashboard';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/dashboard/:userId" element={<UserDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
