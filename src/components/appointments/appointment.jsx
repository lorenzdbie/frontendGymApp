import { toDateInputString, toTimeInputString } from "./appointmentForm";

export default function Appointment(props) {
  const { user, date, training, startTime, endTime, intensity } = props;
  return (
    <div className="text-bg-dark" style={{ width: "50%" }}>
      {user.name} made an appointment on {toDateInputString(new Date(date))} for
      a {training.muscleGroup} training from {toTimeInputString(startTime)} to{" "}
      {toTimeInputString(endTime)} with an intensity of {intensity}.<br />
      <br />
    </div>
  );
}
