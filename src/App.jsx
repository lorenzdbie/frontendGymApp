import "./App.css";
import ExcerciseList from "./components/exercises/ExerciseList";
import AppointmentList from "./components/appointments/appointmentList";
import Loader from "./components/Loader";
import Register from "./components/users/Register";
import Login from "./components/users/Login";
import Navbar from "./components/Navbar";

import {useTheme, themes} from "./context/Theme.context";

import {IoMoonSharp, IoSunny} from "react-icons/io5";

function App() {
  const {theme, oppositeTheme, toggleTheme} = useTheme();

  return (
    <>
   
      {/* <div  className="fullscreen">
        <Login />
      </div> */}

      {/* <div className="loaderContainer className="fullscreen"">
        <Loader loading={true} />
      </div> */}

      <div className={`container-xl bg-${theme} text-${oppositeTheme}`}>
        <div className="d-flex flex-row">
          <button type="button" onClick={toggleTheme}>
            {theme ===themes.dark ? <IoMoonSharp /> : <IoSunny />}
          </button>
          <Navbar />
        </div>

        {/* <div className="fullscreen">
          <Register />
        </div> */}

        {/* <div className="fullscreen">
          <AppointmentList />
        </div> */}

        {/* <div className="fullscreen">
            <ExcerciseList />
          </div> */}
      </div>

    </>
  );
}

export default App;
