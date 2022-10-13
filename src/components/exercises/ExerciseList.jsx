import { useState } from "react";
import Exercise from "./Exercise";
import { EXERCISE_DATA } from "../../api/mock-data";

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
        {EXERCISE_DATA.map((ex) => (
          <Exercise {...ex} key={ex.id} />
        ))}
      </div>
    </>
  );
}
