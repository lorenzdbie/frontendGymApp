import { useState } from "react";
import Exercise from "./Exercise";
import { TRAININGS } from "../../api/mock-data";

export default function ExcerciseList() {
  // const [exercises, setExercises] = useState(EXERCISE_DATA);

  // const createExercise = (name, muscleGroup, intensity) => {
  //   const newExercises = [
  //     {
  //       name,
  //       muscleGroup,
  //       intensity,
  //     },
  //     ...exercises,
  //   ];
  //   setExercises(newExercises);
  // };

  return (
    <>
      <h1>Exercises</h1>
      <div className="exerciseList-box">
        {TRAININGS
        .map((ex) => (
          <Exercise {...ex} key={ex.id} />
        ))}
      </div>
    </>
  );
}
