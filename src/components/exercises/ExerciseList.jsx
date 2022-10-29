import { useState } from "react";
import Exercise from "./Exercise";
import { TRAININGS } from "../../api/mock-data";
import ExerciseForm from "./ExerciseForm";

export default function ExcerciseList() {
  const [exercises, setExercises] = useState(TRAININGS);

  const createExercise = (name, muscleGroup) => {
    const newExercises = [
      ...exercises,
      {
        id: Number(Math.max(...exercises.map((e) => e.id)) + 1),
        name,
        muscleGroup,
      },
    ];
    setExercises(newExercises);
  };

  return (
    <>
      <div className="col-sm-11">
        <h1>Exercises</h1>
        <br/>
        <ExerciseForm onSaveExercise={createExercise} />
      </div>

      <div className="exerciseList-box">
        <h2>Exercise List</h2>
        <br />
        <h6> Sorted by ID:</h6>
        {exercises.map((ex) => (
          <Exercise {...ex} key={ex.id} />
        ))}
      </div>
    </>
  );
}
