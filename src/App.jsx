import "./App.css";
import ExcerciseList from "./components/exercises/ExerciseList";
import AppointmentList from "./components/appointments/appointmentList";
import Loader from "./components/Loader";
import Register from "./components/users/Register";
import Login from "./components/users/Login";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      {/* <div>
        <Login />
      </div> */}

      {/* <div className="loaderContainer">
        <Loader loading={true} />
      </div> */}


      <div>

      <div>
          <Navbar />
        </div>

      {/* <div>
          <Register />
        </div> */}

      <div>
          <AppointmentList />
        </div>

      {/* <div>
          <ExcerciseList />
        </div> */}

      </div>
    </>
  );
}

export default App;
