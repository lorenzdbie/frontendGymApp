import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { EXERCISE_DATA } from "./api/mock-data";
import Exercise from "./components/exercises/Exercise";
import ExcerciseList from "./components/exercises/ExerciseList";
import AppointmentList from "./components/appointments/appointmentList";
import LoginForm from "./components/loginForm";

function App() {
  return (
    <div className="App">
      {/* <h1>Exercises</h1>
      {EXERCISE_DATA.map((ex) => (
        <Exercise {...ex} />
      ))} */}
      <LoginForm />
      {/* <AppointmentList />
      <ExcerciseList /> */}
    </div>
  );
}

export default App;
