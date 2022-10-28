import { useState } from "react";
import "./App.css";
import { TRAININGS } from "./api/mock-data";
import Exercise from "./components/exercises/Exercise";
import ExcerciseList from "./components/exercises/ExerciseList";
import AppointmentList from "./components/appointments/appointmentList";
import LoginForm from "./components/loginForm";
import RegistrationForm from "./components/registrationForm";

function App() {
  return (
    <div className="App">
      {/* <h1>Exercises</h1>
      {EXERCISE_DATA.map((ex) => (
        <Exercise {...ex} />
      ))} */}
      {/* <LoginForm /> */}
      <AppointmentList />
      <ExcerciseList />
      {/* <RegistrationForm /> */}
    </div>
  );
}

export default App;
