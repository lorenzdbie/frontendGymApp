import { memo, useCallback } from "react";
import { Link } from "react-router-dom";
import { useThemeColors } from "/src/contexts/Theme.context.jsx";

import { IoTrashOutline, IoPencilOutline } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default memo(function Exercise({ id, name, muscleGroup, onDelete }) {
  console.log("rendering exercise...");

  const { theme } = useThemeColors();

  const handleDelete = useCallback(
    (event) => {
      event.preventDefault();
      onDelete(id);
      toast.success("Exercise deleted!", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    },
    [id, onDelete]
  );

  return (
    <div className="exercise-box" data-cy="exercise">
      <div className="exercise-boxHead">
        <div data-cy="exercise_id">{id}</div>
        <div data-cy="exercise_name">{name}</div>
        <div className="btn-group float-end">
          <Link
            type="button"
            className={`btn btn-${theme}`}
            to={`/exercises/edit/${id}`}
            onClick={() => window.scrollTo({ top: -500, behavior: "smooth" })}
            data-cy="exercise_edit_btn"
          >
            <IoPencilOutline />
          </Link>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleDelete}
            data-cy="exercise_delete_btn"
          >
            <IoTrashOutline />
          </button>
          <ToastContainer />
        </div>
      </div>

      <div>
        <div>
          <u> Active muscle groups:</u>
        </div>
        <div data-cy="exercise_muscleGroup"> {muscleGroup} </div>
      </div>
    </div>
  );
});
