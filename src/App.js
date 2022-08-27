import "./App.scss"
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import AddCampus from "./components/Campus/Add/AddCampus";
import ListCampus from "./components/Campus/List/ListCampus";
import AddBuildings from "./components/Buidings/Add/AddBuildings";
import ListBuildings from "./components/Buidings/List/ListBuildings";
import Signup from "./components/Signup/Signup.jsx";
import Login from "./components/Login/Login.jsx";
import { useEffect } from "react";
// import Tasks from "./pages/Tasks/Tasks";
import { useSelector } from "react-redux";




function App() {
  const currentUser = useSelector(state => state.user.currentUser)
  useEffect(() => {
  }, [currentUser])

  return (
    <div className="app">
      <div className="top">
        <Navbar />
      </div>
      {
        currentUser ?
          <div className="others">
            <Routes>
              <Route path='/' >
                <Route index element={!currentUser ? <Signup />  : <ListCampus /> } />
                <Route path="signup" element={ !currentUser ? <Signup />  : <ListCampus />  } />
                <Route path="login" element={ !currentUser ? <Login /> : <ListCampus />  } />
                <Route path="campus">
                  <Route index element={<ListCampus />} />
                  <Route path="list" element={<ListCampus />} />
                  <Route path="add" element={<AddCampus />} />
                </Route>
                <Route path="buildings">
                  <Route index element={<ListBuildings />} />
                  <Route path="list" element={<ListBuildings />} />
                  <Route path="add" element={<AddBuildings />} />
                </Route>
              </Route>
            </Routes>
          </div>

          :
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
  );
}

export default App;
