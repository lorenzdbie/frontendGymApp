import { memo, useCallback } from "react";
import { Link } from "react-router-dom";
import { useThemeColors } from "/src/contexts/Theme.context.jsx";

import { IoTrashOutline, IoPencilOutline } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default memo(function Afspraak({
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
  // console.log("test");

  const { theme } = useThemeColors();

  const durationInMinutes =
    (new Date(endTime).getTime() - new Date(startTime).getTime()) / 1000 / 60;

  const handleDelete = useCallback((event) => {
    event.preventDefault();
    onDelete(id);
    toast.success("Appointment deleted!", {
      position: toast.POSITION.BOTTOM_LEFT,
    });
  });

  return (
    <div className="appointment-box" data-cy="appointment">
      <div className="appoitment-boxHead">
        <div>
          <span data-cy="appointment_id">Appointment # {id}</span>
        </div>
        <div
          className="btn-group float-end"
          style={{ maxWidth: "90px", maxHeight: "40px" }}
        >
          <Link
            type="button"
            className={`btn btn-${theme}`}
            to={`/appointments/edit/${id}`}
            data-cy="appointment_edit_btn"
            onClick={() => window.scrollTo({ top: -500, behavior: "smooth" })}
          >
            <IoPencilOutline />
          </Link>
          <button
            type="button"
            className="btn btn-danger rounded-end w-100"
            onClick={handleDelete}
            data-cy="appointment_delete_btn"
          >
            <IoTrashOutline />
          </button>
          <ToastContainer />
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
                {new Date(startTime).toLocaleTimeString("en-BE", {
                  hour: "2-digit",
                  minute: "2-digit",
                  timeZone: "UTC",
                })}
              </td>
            </tr>
            <tr>
              <td>Duration:</td>
              <td data-cy="appointment_duration">
                {durationInMinutes} minutes
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
