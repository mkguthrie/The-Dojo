import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';

// pages and components
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './pages/Dashboard/Dashboard';
import Create from './pages/Create/Create';
import Project from './pages/Project/Project';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';

// styles
import './App.css'
import OnlineUsers from './components/OnlineUsers/OnlineUsers';

function App() {
  const { authIsReady, user } = useAuthContext()

  return (
    <div className="App">
      {authIsReady && (
      <BrowserRouter>
      {user && <Sidebar />}
      <div className="container">
        <Navbar />
        <Routes>
          <Route 
            exact 
            path="/"
            element={user ? <Dashboard /> : <Navigate to="/login" />}  
          />
          <Route  
            path="/create"
            element={user ? <Create /> : <Navigate to="/login" />}     
          />
          <Route  
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}   
          />
          <Route  
            path="/signup"
            element={user ? <Navigate to="/" /> : <Signup />} 
          />
          <Route  
            path="/projects/:id"
            element={user ? <Project /> : <Navigate to="/login" />}   
          />
        </Routes>
      </div>
      {user && <OnlineUsers />}  
      </BrowserRouter>
      )}
    </div>
  );
}

export default App


/*
pages
-dashboard
-login
-signup
-create
-project
*/