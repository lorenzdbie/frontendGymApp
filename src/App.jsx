import "./App.css";
import ExcerciseList from "./components/exercises/ExerciseList";
import AppointmentList from "./components/appointments/appointmentList";
import LoginForm from "./components/users/loginForm";
import RegistrationForm from "./components/users/RegistrationForm";
import Loader from "./components/Loader";
import Register from "./components/users/Register";
import Login from "./components/users/Login";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
    <div> <Navbar/></div>
      {/* <div>
        <Login />
      </div> */}

      {/* <div>
        <Register />
      </div> */}

      {/* <LoginForm /> */}
      {/* <Loader loading={true} /> */}

    <div>
        <AppointmentList />
      </div>

      {/* <div>
        <ExcerciseList/>
      </div>  */}
    </>
  );
}

export default App;
