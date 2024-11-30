import './App.css';
import { Navigate } from 'react-router-dom'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import AddContact from './pages/AddContact';
import AdminHome from './pages/AdminHome';
import EditContact from './pages/EditContact';

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
    path: "addcontact",
    element: <ProtectedRoute><AddContact /></ProtectedRoute>
  }, {
    path: "editcontact/:contactid",
    element: <ProtectedRoute><EditContact /></ProtectedRoute>,
    loader: ({ params }) => {
      return params.contactid;
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
             <ProtectedRoute path='/booking/:contactid' exact component={BookingContact} />
             <ProtectedRoute path='/userbookings' exact component={UserBookings} />
             <ProtectedRoute path='/addcontact' exact component={AddContact} />
             <ProtectedRoute path='/editcontact/:contactid' exact component={EditContact} />
             <ProtectedRoute path='/admin' exact component={AdminHome} />
         
         </BrowserRouter> */}

    </div>
  );
}



export default App;



