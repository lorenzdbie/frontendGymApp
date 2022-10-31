import { memo } from "react";

export default memo(function Exercise({ id, name, muscleGroup }) {
  console.log("rendering exercise...");

  return (
    <div className="exercise-box">
      <div>
        <div>{id}</div>
        <div>{name}</div>
      </div>

      <div>
        <div>
          {" "}
          <u> Active muscle groups:</u>
        </div>
        <div> {muscleGroup} </div>
      </div>
    </div>
  );
});
