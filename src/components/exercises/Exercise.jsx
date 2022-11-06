import { memo, useCallback } from "react";
// import { useThemeColors } from "../../contexts/Themecontext";

export default memo(function Exercise({ id, name, muscleGroup, onDelete }) {
  console.log("rendering exercise...");

  // const { theme, oppositeTheme } = useThemeColors();

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
        <div>
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={handleDelete}
          >
            <span aria-hidden="true">&times;</span>
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
