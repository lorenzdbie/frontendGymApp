import { useState } from "react";
import "./App.css";
import { TRAININGS } from "./api/mock-data";
import Exercise from "./components/exercises/Exercise";
import ExcerciseList from "./components/exercises/ExerciseList";
import AppointmentList from "./components/appointments/appointmentList";
import LoginForm from "./components/loginForm";
import RegistrationForm from "./components/registrationForm";
import Loader from "./components/Loader";

function App() {
  return (
    <div className="App">
      {/* <LoginForm /> */}
      <Loader loading={true} />
      {/* <AppointmentList />
      <ExcerciseList /> */}
      {/* <RegistrationForm /> */}
    </div>
  );
}

export default App;
