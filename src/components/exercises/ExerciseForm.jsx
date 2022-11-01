// import { useState } from "react";
import { useForm } from "react-hook-form";
import { validationRules } from "../ValidationRules";

export default function ExerciseForm({ onSaveExercise }) {
  // const [name, setName] = useState("");
  // const [muscleGroup, setMuscleGroup] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    onSaveExercise(data.name, data.muscleGroup);
    reset();
    // e.preventDefault();
    // onSaveExercise(name, muscleGroup);
    // setName("");
    // setMuscleGroup("");
  };

  return (
    <div className="d-flex flex-column col-12 ">
      <h2>Add exercise</h2>
      <br />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-3 justify-content-md-center formContainer"
      >
        <div className="d-flex flex-row">
          <label htmlFor="name" className="form-label col-6 my-auto">
            Exercise name:
          </label>
          <input
            {...register("name", validationRules.name)}
            id="name"
            type="text"
            className="form-control col rounded-5 my-auto"
            placeholder="exercise name"
          />
        </div>
        <div className="d-flex flex-column mt-3">
          <label htmlFor="muscleGroup" className="form-label col-7">
            Muscle groups:
          </label>

          <textarea
            {...register("muscleGroup", validationRules.muscleGroup)}
            id="muscleGroup"
            type="text"
            cols="1"
            rows="6"
            className="form-control col rounded-5"
            placeholder="muscle groups"
          />
        </div>
        {errors.user && (
          <div className="text-danger"> {errors.user.message}</div>
        )}

        <div className="clearfix my-4 d-flex flex-row justify-content-center">
          <div className="btn-group">
            <button type="submit" className="btn btn-primary rounded-5">
              Add Exercise
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
