import './App.css';
import { ToastContainer } from "react-toastify";
import {BrowserRouter , Routes, Route, json} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Header from './components/Header';
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setuser } from './redux/feature/auth';
import AddEditTour from './pages/AddEditTour';
import SingleTour from "./pages/SingleTour";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./pages/NotFound";
import TagTours from "./pages/TagTours";

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
    dispatch(setuser(user));
  });
  return (
    <BrowserRouter>
    <div className="App">
      <Header/>
   <ToastContainer/>
   <Routes>
    <Route path = "/" element={<Home/>} />
    <Route path="/tours/search" element={<Home />} />
    <Route path="/tours/tag/:tag" element={<TagTours />} />

    <Route path = "/register" element={<Register/>} />
    <Route path = "/login" element={<Login/>} />
  
    
    <Route
            path="/addTour"
            element={
              <PrivateRoute>
                <AddEditTour />
              </PrivateRoute>
            }
          />
    <Route
            path="/editTour/:id"
            element={
              <PrivateRoute>
                <AddEditTour />
              </PrivateRoute>
            }
          />
    <Route path="/tour/:id" element={<SingleTour />} />
    <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
    <Route path="*" element={<NotFound />} />
   </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
