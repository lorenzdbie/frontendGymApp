import { toTimeInputString } from "./appointmentForm";

export const toHoursInputString = (time) => {
  if (!time) return null;
  if (typeof time !== Object) {
    time = new Date(time);
  }
  let aString = time.toISOString();
  console.log(aString);
  return aString.substring(aString.indexOf("T") + 2, aString.indexOf("Z") - 7);
};

export default function Appointment({
  id,
  user,
  date,
  training,
  startTime,
  endTime,
  intensity,
  specialRequest,
}) {
  return (
    <div
      className="text-bg-light rounded border border-dark my-1"
      style={{ minwidth: "200 px" }}
    >
      <div style={{ display: "flex", marginLeft: "auto" }}>
        <h4 style={{ margin: "auto" }}>Appointment # {id}</h4>
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
        Trainee:&ensp;&ensp;&ensp;{user.firstName + " " + user.lastName} <br />
        Date:&ensp;&ensp;&ensp;&ensp;&nbsp;&ensp;
        {new Date(date).toLocaleDateString("en-BE", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
        <br />
        Training:&ensp;&ensp;&nbsp;{training.muscleGroup}
        <br />
        Starts at:&ensp;&ensp;{toTimeInputString(startTime)}
        <br />
        Duration:&ensp;&ensp;
        {toHoursInputString(new Date(endTime) - new Date(startTime))} hours
        <br />
        Intensity:&ensp;&ensp;{intensity}
        <br />
        {specialRequest ? `Special request:&ensp;&ensp;${specialRequest}` : ""}
      </div>
    </div>
  );
}
