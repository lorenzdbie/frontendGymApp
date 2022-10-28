import { toDateInputString, toTimeInputString } from "./appointmentForm";

export default function Appointment(props) {
  const { id, user, date, training, startTime, endTime, intensity } = props;
  return (
    <div
      className="text-bg-light rounded border border-dark my-1"
      style={{ width: "50%" }}
    >
      <div style={{ display: "flex", marginLeft: "auto" }}>
        <h4 style={{ margin: "auto" }}>Appointment {id}</h4>
        <button
          type="button"
          className="close"
          aria-label="Close"
          style={{ marginLeft: "auto", backgroundColor: "gray" }}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <div style={{ margin: "10px 20px", textAlign: "left" }}>
        {user.name} made an appointment on {toDateInputString(new Date(date))}{" "}
        for a {training.muscleGroup} training from{" "}
        {toTimeInputString(startTime)} to {toTimeInputString(endTime)} with an
        intensity of {intensity}.<br />
      </div>
    </div>
  );
}
