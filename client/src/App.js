import {BrowserRouter,Routes,Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import Login from './pages/Login';

import Register from './pages/Register';
import './App.css';
import { useSelector } from 'react-redux';
import Spinner from './components/Spinner';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import ApplyDoctor from './pages/ApplyDoctor';
import NotificationPage from './pages/NotificationPage';
import Users from './pages/admin/Users';
import Doctors from './pages/admin/Doctors';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import LoginOtp from './pages/LoginOtp';
import Otp from './pages/Otp';


function App() {
  const {loading} = useSelector(state=>state.alerts)
  return (
    <>
      <BrowserRouter>
        {loading ? (<Spinner/>) :
        <Routes>
          <Route path='/'
           element={
           <ProtectedRoute>
            <HomePage/>
          </ProtectedRoute>
          }
          />
          <Route path='/apply-doctor'
           element={
           <ProtectedRoute>
            <ApplyDoctor/>
          </ProtectedRoute>
          }
          />
          <Route path='/admin/users'
           element={
           <ProtectedRoute>
            <Users/>
          </ProtectedRoute>
          }
          />
          <Route path='/admin/doctors'
           element={
           <ProtectedRoute>
            <Doctors/>
          </ProtectedRoute>
          }
          />
          <Route path='/notification'
           element={
           <ProtectedRoute>
            <NotificationPage/>
          </ProtectedRoute>
          }
          />
          <Route path='/loginOtp' 
          element={
          <PublicRoute>
            <LoginOtp/>
          </PublicRoute>}/>
          <Route path='/user/otp' 
          element={
          <PublicRoute>
            <Otp/>
          </PublicRoute>}/>

        <Route path='/register'
        element={
        <PublicRoute>
           <Register/>
        </PublicRoute>
        }/>
        </Routes>
        }
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
