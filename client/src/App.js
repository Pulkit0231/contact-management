import './App.css';
import { Navigate } from 'react-router-dom'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import AddCar from './pages/AddCar';
import AdminHome from './pages/AdminHome';
import EditCar from './pages/EditCar';

export const ProtectedRoute = ({ children }) => {

  if (localStorage.getItem('user')) {
    return children;
  }
  return <Navigate to="/login" />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute><Home /></ProtectedRoute>,
  }, {
    path: "/login",
    element: <Login />
  }, {
    path: "/register",
    element: <Register />
  }, {
    path: "addcar",
    element: <ProtectedRoute><AddCar /></ProtectedRoute>
  }, {
    path: "editcar/:carid",
    element: <ProtectedRoute><EditCar /></ProtectedRoute>,
    loader: ({ params }) => {
      return params.carid;
    }
  }, {
    path: "admin",
    element: <ProtectedRoute><AdminHome /></ProtectedRoute>
  }
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />


      {/* <BrowserRouter>
         
             <ProtectedRoute path='/' exact component={Home} />
             <Route path='/login' exact component={Login} />
             <Route path='/register' exact component={Register} />
             <ProtectedRoute path='/booking/:carid' exact component={BookingCar} />
             <ProtectedRoute path='/userbookings' exact component={UserBookings} />
             <ProtectedRoute path='/addcar' exact component={AddCar} />
             <ProtectedRoute path='/editcar/:carid' exact component={EditCar} />
             <ProtectedRoute path='/admin' exact component={AdminHome} />
         
         </BrowserRouter> */}

    </div>
  );
}



export default App;



