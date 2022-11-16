import { memo, useCallback } from "react";
import { Link } from 'react-router-dom';
import { useThemeColors } from "../../contexts/Theme.context";

import { IoTrashOutline, IoPencilOutline } from "react-icons/io5";

export default memo(function Exercise({ id, name, muscleGroup, onDelete }) {
  console.log("rendering exercise...");

  const { theme } = useThemeColors();

  const handleDelete = useCallback(
    (event) => {
      event.preventDefault();
      onDelete(id);
    },
    [id, onDelete]
  );

  return (
    <div className="exercise-box">
      <div className="exercise-boxHead">
        <div>{id}</div>
        <div>{name}</div>
        <div className="btn-group float-end">
          <Link
            type="button"
            className={`btn btn-${theme}`}
            to={`/exercises/edit/${id}`}
          >
            <IoPencilOutline />
          </Link>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleDelete}
          >
            <IoTrashOutline />
          </button>
        </div>
      </div>

      <div>
        <div>
          
          <u> Active muscle groups:</u>
        </div>
        <div> {muscleGroup} </div>
      </div>
    </div>
  );
});
