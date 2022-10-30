import "./App.css";
import ExcerciseList from "./components/exercises/ExerciseList";
import AppointmentList from "./components/appointments/appointmentList";
import LoginForm from "./components/users/loginForm";
import RegistrationForm from "./components/users/RegistrationForm";
import Loader from "./components/Loader";
import Register from "./components/users/Register";

function App() {
  return (
    <div className="App d-flex flex-rom">
      {/* <LoginForm /> */}
      {/* <Loader loading={true} /> */}
      <AppointmentList className="col"/>
      {/* <ExcerciseList /> */}
      <Register />
      {/* <RegistrationForm /> */}
    </div>
  );
}

export default App;
