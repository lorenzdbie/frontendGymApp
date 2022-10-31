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
      <h1 className="mt-5">Exercises</h1>
    <div className="landscape">
      <div className="formContainer">
        <ExerciseForm onSaveExercise={createExercise} />
      </div>

      {/* <div className="spacer">
        <div></div>
      </div> */}

      <div className="mobilehide">
        <h2>Exercise List</h2>
        <br />
        <h6> Sorted by ID:</h6>
        <div className="exbox">
          {exercises.map((ex) => (
            <Exercise {...ex} key={ex.id} />
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
