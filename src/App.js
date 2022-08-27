import "./App.scss"
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import AddCampus from "./components/Campus/Add/AddCampus";
import ListCampus from "./components/Campus/List/ListCampus";
import AddBuildings from "./components/Buidings/Add/AddBuildings";
import ListBuildings from "./components/Buidings/List/ListBuildings";
import Signup from "./components/Signup/Signup.jsx";
import Login from "./components/Login/Login.jsx";
import AuthProvider from "./features/AuthProvider";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "./features/Reducer";
import Tasks from "./pages/Tasks/Tasks";


function App() {
  const auth = localStorage.getItem("userData")
  const user = useSelector(selectUser)
  useEffect(() => {

  }, [auth , user])


  return (
    <div className="app">
      <div className="top">
        <Navbar />
      </div>
      <div className="others">

        {
          auth ? <Routes>
            <Route path='/' >
              <Route index element={<Tasks />} />
              <Route path="signup" element={<Signup />} />
              <Route path="login" element={!user ? <Login /> : <ListCampus />} />
              <Route path="campus">
                <Route index element={<AuthProvider><ListCampus /></AuthProvider>} />
                <Route path="list" element={<AuthProvider><ListCampus /></AuthProvider>} />
                <Route path="add" element={<AuthProvider><AddCampus /></AuthProvider>} />
              </Route>
              <Route path="buildings">
                <Route index element={<AuthProvider><ListBuildings /></AuthProvider>} />
                <Route path="list" element={<AuthProvider><ListBuildings /></AuthProvider>} />
                <Route path="add" element={<AuthProvider><AddBuildings /></AuthProvider>} />
              </Route>
            </Route>
          </Routes> :
            <Routes>
              <Route path="/" >
                <Route index element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="login" element={<Login />} />
                <Route path="*" element={<Login />} />
              </Route>
            </Routes>
        }



      </div>

    </div>
  );
}

export default App;
