import { useState } from "react";
import { APPOINTMENTS, EXERCISE_DATA } from "../../api/mock-data";
import DumbbellIntensity from "./dumbellIntensity";

export const toDateInputString = (date) => {
  if (!date) return null;
  if (typeof date !== Object) {
    date = new Date(date);
  }
  let aString = date.toISOString();
  return aString.substring(0, aString.indexOf("T"));
};

export const toTimeInputString = (time) => {
  if (!time) return null;
  if (typeof time !== Object) {
    time = new Date(time);
  }
  let aString = time.toISOString();
  console.log(aString);
  return aString.substring(aString.indexOf("T") + 1, aString.indexOf("Z") - 7);
};

const addTimeToDate = (date, time) => {
  date = toDateInputString(date);
  let tijd = date + "T" + time + ":00.000Z";
  return tijd;
};

export default function AppointmentForm({ onSaveAppointment }) {

  const [user, setUser] = useState("");
  const [date, setDate] = useState("");
  const [training, setTraining] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [intensity, setIntensity] = useState();
  const [specialRequest, setSpecialRequest] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const start = addTimeToDate(date, startTime);
    const end = addTimeToDate(date, endTime);
    const sessie = training;
    onSaveAppointment(user, date, sessie, start, end, intensity);
    setUser("");
    setDate("");
    setTraining("");
    setStartTime("");
    setEndTime("");
    setIntensity();
  };

  return (
    <>
      <h2>Add Appointment</h2>
      <form
        onSubmit={handleSubmit}
        className="w-50 mb-3"
        style={{ minWidth: "200px" }}
      >
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Who
          </label>
          <input
            value={user}
            onChange={(e) => setUser(e.target.value)}
            id="user"
            type="text"
            className="form-control"
            placeholder="user"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Date
          </label>
          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            id="date"
            type="date"
            className="form-control"
          />
        </div>
        <p>
          {date} {typeof date}
        </p>
        <div className="mb-3">
          <label htmlFor="trainings" className="form-label">
            Training
          </label>
          <select
            value={training.muscleGroup}
            onChange={(e) => {
              e.stopPropagation();
              setTraining(e.target.value);
            }}
            id="trainings"
            className="form-select"
            required
          >
            <option defaultChecked>--Select a training--</option>
            {EXERCISE_DATA.map(({ id, muscleGroup }) => (
              <option key={id} value={muscleGroup}>
                {muscleGroup}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="startTime" className="form-label">
            Start Time
          </label>
          <input
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            id="time"
            type="time"
            min="08:00"
            max="18:30"
            step="900"
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="endTime" className="form-label">
            End Time
          </label>
          <input
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            id="time"
            type="time"
            min="08:30"
            max="19:00"
            step="900"
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="intensity" className="form-label">
            Intensity
          </label>
          <div>
            <span>0 </span>
            <input
              type="range"
              onChange={(e) => setIntensity(e.target.value)}
              min={0}
              max={5}
              step="0.5"
              value={intensity}
              name="rangeInput"
              className="slider"
              id="intensity"
            />
            <span> 5</span>
          </div> 
           <p id="intensitySlider"></p>
          <div>
            <DumbbellIntensity
              selectedDumbbells={intensity}
              value={intensity}
              onChange={(e) => setIntensity(e.target.value)}
            />
          </div>
          <br />
          <div className="mb-3">
            <label htmlFor="specialRequest" className="form-label">
              Special request:
            </label>
            <input
              value={specialRequest}
              onChange={(e) => setSpecialRequest(e.target.value)}
              id="specialRequest"
              type="textfield"
              className="form-control"
              placeholder="specialRequest"
              style={{ width: "200px", height: "100px", textAlign: "start" }}
            />
          </div>
        </div>
        <div className="clearfix">
          <div className="btn-group float-end">
            <button type="submit" className="btn btn-primary">
              Add Appointment
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
