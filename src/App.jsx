import "./App.css";
import React from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/users/Login";
import Register from "./components/users/Register";
import AppointmentList from "./components/appointments/appointmentList";
import ExerciseList from "./components/exercises/ExerciseList";
import UserList from "./components/users/UserList";
import NotFound from "./components/NotFound";
import {useThemeColors } from "./contexts/Theme.context";

function App() {
  const { theme, oppositeTheme} = useThemeColors();

  return (
    <>
    <div className={`bg-${theme} text-${oppositeTheme}`}>
      <Navbar/>
     


      <Routes>
        <Route path="/" element={<Navigate to="/Login"/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/appointments" element={<AppointmentList/>}/>
        <Route path="/appointments/edit/:id" element={<AppointmentList/>}/>
        <Route path="/exercises" element={<ExerciseList/>}/>
        <Route path="/exercises/edit/:id" element={<ExerciseList/>}/>
        <Route path="/users" element={<UserList/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>


    </div>

    {/* <Loader loading={true}/> */}
    {/* <Login/> */}
     {/* <ExerciseList/> */}
     
      {/* <Register/> */}
    </>
  );
}

export default App;
