import "./App.css";
import ExerciseList from "./components/exercises/ExerciseList";
import AppointmentList from "./components/appointments/appointmentList";
import Loader from "./components/Loader";
import Register from "./components/users/Register";
import Login from "./components/users/Login";
import Navbar from "./components/Navbar";
import React from "react";
import { useTheme, themes } from "./contexts/Theme.context";
import { IoMoonSharp, IoSunny } from "react-icons/io5";

function App() {
  const { theme, oppositeTheme, toggleTheme } = useTheme();

  return (
    <>
    <div className={`bg-${theme} text-${oppositeTheme}`}>
      <button type="button" onClick={toggleTheme} className={`bg-${theme} text-${oppositeTheme}`}>
         {theme === themes.dark ? <IoMoonSharp /> : <IoSunny />}
      </button>
      <Navbar />
    </div>

    <Loader loading={true}/>
    {/* <Login/> */}
     {/* <ExerciseList/> */}
     {/* <AppointmentList /> */}
      {/* <Register/> */}
    </>
  );
}

export default App;

{
  
}
{
  /* <Loader loading={true}/> */
}
{
 
}
{
  
}
{
  
}
//
// <div className="d-flex flex-row">
//   <button type="button" onClick={toggleTheme}>
//     {theme === themes.dark ? <IoMoonSharp /> : <IoSunny />}
//   </button>
//   <Navbar />
// </div>
// </div>
{
  /* <div  className="fullscreen">
        <Login />
      </div> */
}

{
  /* <div className="loaderContainer className="fullscreen"">
        <Loader loading={true} />
      </div> */
}
