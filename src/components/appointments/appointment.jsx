import { memo, useCallback } from "react";
import { toTimeInputString } from "./AppointmentForm.jsx";
import { IoTrashOutline, IoPencilOutline } from "react-icons/io5";
import { useThemeColors } from "/src/contexts/Theme.context.jsx";
import { Link } from "react-router-dom";

export const toHoursInputString = (time) => {
  if (!time) return null;
  if (typeof time !== Object) {
    time = new Date(time);
  }
  let aString = time.toISOString();
  console.log(aString);
  return aString.substring(aString.indexOf("T") + 1, aString.indexOf("Z") - 7);
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
}) {
  console.log("rendering appointment...");

  const { theme } = useThemeColors();

  const handleDelete = useCallback(
    (event) => {
      event.preventDefault();
      onDelete(id);
    },
    [id, onDelete]
  );

  return (
    <div className="appointment-box" data-cy="appointment">
      <div className="appoitment-boxHead">
        <div>
          <span data-cy="appointment_id">Appointment # {id}</span>
        </div>
        <div className="btn-group float-end">
          <Link
            type="button"
            className={`btn btn-${theme}`}
            to={`/appointments/edit/${id}`}
          >
            <IoPencilOutline />
          </Link>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleDelete}
            data-cy="appointment_delete_btn"
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
              <td data-cy="appointment_user">
                {user.firstName + " " + user.lastName}
              </td>
            </tr>
            <tr>
              <td>Date:</td>
              <td data-cy="appointment_date">
                {new Date(date).toLocaleDateString("en-BE", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </td>
            </tr>
            <tr>
              <td>Training:</td>
              <td data-cy="appointment_training">{training.name}</td>
            </tr>
            <tr>
              <td>Starts at:</td>
              <td data-cy="appointment_startTime">
                {toTimeInputString(startTime)}
              </td>
            </tr>
            <tr>
              <td>Duration:</td>
              <td data-cy="appointment_duration">
                {toHoursInputString(new Date(endTime) - new Date(startTime))}{" "}
                hours
              </td>
            </tr>
            <tr>
              <td>intensity: </td>
              <td data-cy="appointment_intensity">{intensity}</td>
            </tr>
            {specialRequest ? (
              <tr>
                <td>Special request:</td>
                <td data-cy="appointment_specialRequest">{specialRequest}</td>
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
