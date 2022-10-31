import { useState } from "react";

export default function ExerciseForm({ onSaveExercise }) {
  const [name, setName] = useState("");
  const [muscleGroup, setMuscleGroup] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveExercise(name, muscleGroup);
    setName("");
    setMuscleGroup("");
  };

  return (
    <div className="d-flex flex-column col-12 ">
      <h2>Add exercise</h2>
      <br />
      <form
        onSubmit={handleSubmit}
        className="mb-3 justify-content-md-center formContainer"
      >
        <div className="d-flex flex-row">
          <label
            htmlFor="name"
            className="form-label col-5 my-auto "
          >Exercise name:
          </label>
         
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              type="text"
              className="form-control col rounded-5"
              placeholder="exercise name"
              required
            />
          </div>
        <div className="d-flex flex-column mt-2">
          <label
            htmlFor="muscleGroup"
            className="form-label col-7"
          >
            Muscle groups:
          </label>
         
            <textarea
              value={muscleGroup}
              onChange={(e) => setMuscleGroup(e.target.value)}
              id="muscleGroup"
              type="text"
              cols="1"
              rows="6"
              className="form-control col rounded-5"
              placeholder="muscle groups"
              required
            />
          </div>
        
        <div className="clearfix my-4">
          <div className="btn-group float-center">
            <button type="submit" className="btn btn-primary rounded-5">
              Add Exercise
            </button>
          </div>
        </div>
      </form>
      </div>
  );
}
