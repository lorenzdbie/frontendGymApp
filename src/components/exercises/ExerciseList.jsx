import { useCallback, useState, useMemo } from "react";
import Exercise from "./Exercise";
import { TRAININGS } from "../../api/mock-data";
import ExerciseForm from "./ExerciseForm";


export default function ExcerciseList() {
  const [exercises, setExercises] = useState(TRAININGS);
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");

  const filteredExercises = useMemo(
    () =>
      exercises.filter((exercise) => {
        return (
          exercise.name.toLowerCase().includes(search.toLowerCase()) ||
          exercise.muscleGroup.toLowerCase().includes(search.toLowerCase())
        );
      }),
    [exercises, search]
  );

  const handleSearch = (e) => {
    setText(e.target.value);
    setTimeout(setSearch(text), 1500);
  };

  const createExercise = useCallback(
    (name, muscleGroup) => {
      const newExercises = [
        ...exercises,
        {
          id: Number(Math.max(...exercises.map((e) => e.id)) + 1),
          name,
          muscleGroup,
        },
      ];
      setExercises(newExercises);
      console.log("newExercises", JSON.stringify(newExercises));
    },
    [exercises]
  );




  function CreateExerciseList({ exercises }) {
    const handleDelete = (id) => {
      console.log("onDeleteConfirm", id);
      const newExercises = exercises.filter((e) => e.id !== id);
      setExercises(newExercises);
    };

    if (exercises.length === 0) {
      return <div className="exbox">"there are no exercises"</div>;
    }
    return (
      <>
        <h6> Sorted by ID:</h6>
        <div className={`exbox`}>
          {exercises.map((ex) => (
            <Exercise
              {...ex}
              key={ex.id}
              index={ex.id}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </>
    );
  }

  return (
    <div className={`fullscreen`}>
      <div className="d-flex flex-row justify-content-end">
        <div className="mx-5 mt-2 d-flex flex-row justify-content-between">
          <input
            type="search"
            id="search"
            className={`form-control rounded-5`}
            placeholder="Search exercises"
            value={text}
            onChange={handleSearch}
          />
        </div>
      </div>
      <h1 className="mt-5">Exercises</h1>
      <div className="landscape">
        <div className="formContainer">
          <ExerciseForm onSaveExercise={createExercise} />
        </div>

        <div className="mobilehide">
          <h2>Exercise List</h2>
          <br />

          <CreateExerciseList exercises={filteredExercises} />
          {/* <h6> Sorted by ID:</h6>
          <div className="exbox">
            {exercises.map((ex) => (
              <Exercise
                {...ex}
                key={ex.id}
                index={ex.id}
                onDelete={handleDelete}
              />
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
}
