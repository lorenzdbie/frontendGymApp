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
    <>
      <h2>Add exercise</h2>
      <br />
      <form
        onSubmit={handleSubmit}
        className="w-60 mb-3"
        style={{ maxWidth: "90%", minWidth: "500px" }}
      >
        <div className="mb-3 form-group row">
          <label
            htmlFor="name"
            className="col-sm-5 col-form-label-lg form-label"
          >
            Enter exercise name:
          </label>
          <div className="col-sm-6 mb-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              type="text"
              className="form-control form-control-lg"
              placeholder="exercise name"
              required
            />
          </div>
        </div>
        <div className="mb-3 form-group row">
          <label
            htmlFor="muscleGroup"
            className="col-sm-5 col-form-label-lg form-label"
          >
            Enter muscle groups:
          </label>
          <div className="col-sm-6 mb-3">
            <textarea
              value={muscleGroup}
              onChange={(e) => setMuscleGroup(e.target.value)}
              id="muscleGroup"
              type="text"
              cols="1"
              rows="6"
              className="form-control form-control-lg"
              placeholder="muscle groups"
              required
            />
          </div>
        </div>
        <div className="clearfix">
          <div className="btn-group float-center">
            <button type="submit" className="btn btn-primary">
              Add Exercise
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
