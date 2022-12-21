import { useCallback, useState, useEffect, useMemo } from "react";
import Exercise from "/src/components/exercises/Exercise.jsx";
import ExerciseForm from "/src/components/exercises/ExerciseForm.jsx";
import { useThemeColors } from "/src/contexts/Theme.context.jsx";
import useExercises from "/src/api/exercises.jsx";
import Loader from "/src/components/Loader.jsx";
import Error from "/src/components/Error.jsx";

export default function ExerciseList() {
  const { theme, oppositeTheme } = useThemeColors();
  const [exercises, setExercises] = useState([]);
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const exercisesApi = useExercises();

  const refreshExercises = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedExercises = await exercisesApi.getAll();
      setExercises(fetchedExercises);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshExercises();
  }, [refreshExercises]);

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

  const handleDelete = useCallback(async (idToDelete) => {
    try {
      setError(null);
      await exercisesApi.deleteById(idToDelete);
      console.log("deleted exercise with id: ", idToDelete);
      setExercises((exercises) =>
        exercises.filter((exercise) => exercise.id !== idToDelete)
      );
    } catch (error) {
      console.error(error);
      setError(error);
    }
  }, []);

   function CreateExerciseList({ exercises, onDelete }) {
    if (exercises.length === 0) {
      return <div className="exbox">"there are no exercises"</div>;
    }
    return (
      <>
        <h6 className="text-center"> Sorted by ID:</h6>
        <div className={`exbox`}>
          <Loader loading={loading} />
          <Error error={error} />
          {!loading && !error ? (
            <>
              {exercises
                .sort((a, b) => a.id - b.id)
                .map((ex) => (
                  <Exercise
                    {...ex}
                    key={ex.id}
                    index={ex.id}
                    onDelete={onDelete}
                  />
                ))}
            </>
          ) : null}
        </div>
      </>
    );
  };

  return (
    <div className={`fullscreen bg-${theme} text-${oppositeTheme}`}>
      <div className="d-flex flex-row justify-content-end">
        <div className="mx-5 mt-2 d-flex flex-row justify-content-between">
          <input
            type="search"
            id="search"
            className="form-control rounded-5"
            placeholder="Search exercises"
            value={text}
            onChange={handleSearch}
            data-cy="exercises_search_input"
          />
        </div>
      </div>
      <h1 className="mt-5 text-center">Exercises</h1>
      <div className="landscape">
        <div className="formContainer">
          <ExerciseForm refreshExercises={refreshExercises} />
        </div>
        <div className="mobilehide">
          <h2 className="text-center">Exercise List</h2>
          <br />
          <Loader loading={loading} />
          <Error error={error} />
          {!loading && !error ? (
            <CreateExerciseList
              exercises={filteredExercises}
              onDelete={handleDelete}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
