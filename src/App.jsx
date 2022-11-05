import "./App.css";
import ExerciseList from "./components/exercises/ExerciseList";
import AppointmentList from "./components/appointments/appointmentList";
import Loader from "./components/Loader";
import Register from "./components/users/Register";
import Login from "./components/users/Login";
import Navbar from "./components/Navbar";
import React from "react";
import {useThemeColors } from "./contexts/Theme.context";

function App() {
  const { theme, oppositeTheme} = useThemeColors();

  return (
    <>
    <div className={`bg-${theme} text-${oppositeTheme}`}>
      <Navbar/>
    </div>

    {/* <Loader loading={true}/> */}
    {/* <Login/> */}
     {/* <ExerciseList/> */}
     {/* <AppointmentList/> */}
      <Register/>
    </>
  );
}

export default App;
