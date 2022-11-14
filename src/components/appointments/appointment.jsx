import { memo, useCallback } from "react";
import { toTimeInputString } from "./AppointmentForm";
import { IoTrashOutline, IoPencilOutline } from "react-icons/io5";
import { useThemeColors } from "../../contexts/Theme.context";

export const toHoursInputString = (time) => {
  if (!time) return null;
  if (typeof time !== Object) {
    time = new Date(time);
  }
  let aString = time.toISOString();
  console.log(aString);
  return aString.substring(aString.indexOf("T") + 2, aString.indexOf("Z") - 7);
};

export default memo(function Appointment({
  id,
  user,
  date,
  training,
  startTime,
  endTime,
  intensity,
  specialRequest,
  onDelete,
  onEdit,
}) {
  console.log("rendering appointment...");

  const { theme, oppositeTheme } = useThemeColors();

  const handleDelete = useCallback(
    (event) => {
      event.preventDefault();
      onDelete(id);
    },
    [id, onDelete]
  );

  const handleUpdate = useCallback(
    (event) => {
      event.preventDefault();
      console.log("to update id: ", id);
      onEdit(id);
    },
    [id, onEdit]
  );

  return (
    <div className="appointment-box">
      <div className="appoitment-boxHead">
        <div>
          <span>Appointment # {id}</span>
        </div>
        <div className="btn-group float-end">
          <button
            type="button"
            className={`btn btn-${theme}`}
            onClick={handleUpdate}
          >
            <IoPencilOutline />
          </button>
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
        <table>
          <tbody>
            <tr>
              <td>Trainee:</td>
              <td>{user.firstName + " " + user.lastName}</td>
            </tr>
            <tr>
              <td>Date:</td>
              <td>
                {" "}
                {new Date(date).toLocaleDateString("en-BE", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </td>
            </tr>
            <tr>
              <td>Training</td>
              <td>{training.muscleGroup}</td>
            </tr>
            <tr>
              <td>Starts at:</td>
              <td>{toTimeInputString(startTime)}</td>
            </tr>
            <tr>
              <td>Duration:</td>
              <td>
                {toHoursInputString(new Date(endTime) - new Date(startTime))}{" "}
                hours
              </td>
            </tr>
            <tr>
              <td>intensity</td>
              <td>{intensity}</td>
            </tr>
            {specialRequest ? (
              <tr>
                <td>Special request:</td>
                <td>{specialRequest}</td>
              </tr>
            ) : (
              ""
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
});
