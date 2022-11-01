import "./App.css";
import ExerciseList from "./components/exercises/ExerciseList";
import AppointmentList from "./components/appointments/appointmentList";
import Loader from "./components/Loader";
import Register from "./components/users/Register";
import Login from "./components/users/Login";
import Navbar from "./components/Navbar";

import { useTheme, themes } from "./contexts/Themecontext";
import { ThemeProvider } from "./contexts/Themecontext";

import { IoMoonSharp, IoSunny } from "react-icons/io5";

function App() {
  // const { theme, oppositeTheme, toggleTheme } = useTheme();

  return (
    <>
      <Navbar />
      {/* <Login/> */}
     {/* <Loader loading={true}/> */}
      {/* <Register/> */}
      {/* <ExerciseList/> */}
      <AppointmentList/>
    
    </>
  );
}

export default App;

// <div className={`container-xl bg-${theme} text-${oppositeTheme}`}>
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
