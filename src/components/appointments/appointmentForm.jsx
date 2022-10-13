import { useState } from "react";
import { APPOINTMENTS, EXERCISE_DATA } from "../../api/mock-data";

const toDateInputString = (date) => {
  if (!date) return null;
  if (typeof date !== Object) {
    date = new Date();
  }
  let aString = date.toISOString();
  return aString.substring(0, aString.indexOf("T"));
};

export default function AppointmentForm(onSaveAppointment) {
  const [user, setUser] = useState("");
  const [date, setDate] = useState(new Date());
  const [training, setTraining] = useState("");
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [intensity, setIntensity] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveAppointment(user, date, training, startTime, endTime, intensity);
    setUser("");
    setDate(new Date());
    setTraining("");
    setStartTime(new Date());
    setEndTime(new Date());
    setIntensity(3);
  };

  return (
    <>
      <h2>Add Appointment</h2>
      <form onSubmit={handleSubmit} className="w-50 mb-3">
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
            value={toDateInputString(date)}
            onChange={(e) => setDate(e.target.value)}
            id="date"
            type="date"
            className="form-control"
            placeholder="date"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="trainings" className="form-label">
            Place
          </label>
          <select
            value={training}
            onChange={(e) => setTraining(e.target.value)}
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
        {/* <div className="mb-3">
          <label htmlFor="startTime" className="form-label">
            Start Time
          </label>
          <input
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            id="time"
            type="time"
            className="form-control"
            placeholder="startTime"
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
            className="form-control"
            placeholder="startTime"
          />Í
        </div> */}
        <div className="mb-3">
          <label htmlFor="intensity" className="form-label">
            Intensity
          </label>
          <input
            type="range"
            onChange={(e) => setIntensity(e.target.value)}
            min="1"
            max="5"
            // onInput= intensitySlider.innerText = this.value
            className="slider"
            id="intensity"
          />
          <p id="intensitySlider">3</p>
        </div>
      </form>
    </>
  );
}
