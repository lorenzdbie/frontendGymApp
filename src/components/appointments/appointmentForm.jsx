import { useState } from "react";
import { TRAININGS } from "../../api/mock-data";
import DumbbellIntensity  from "./dumbellIntensity";

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

export default function AppointmentForm({
  onSaveAppointment,
  onSelect = (f) => f,
}) {
  const [dumbbellIntensity, setDumbbellIntensity] = useState(onSelect);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [date, setDate] = useState("");
  const [training, setTraining] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [intensity, setIntensity] = useState(2);
  const [specialRequest, setSpecialRequest] = useState("");

  const changeDumbbells = (newIntensity) => {
    setDumbbellIntensity(newIntensity);
  };
  const changeIntensity = () => {
    setIntensity(selectedDumbbells);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const start = addTimeToDate(date, startTime);
    const end = addTimeToDate(date, endTime);
    onSaveAppointment(
      firstName,
      lastName,
      date,
      training,
      start,
      end,
      intensity,
      specialRequest
    );
    setFirstName("");
    setLastName("");
    setDate("");
    setTraining("");
    setStartTime("");
    setEndTime("");
    setIntensity(0);
    setSpecialRequest("");
  };

  return (
    <>
      <h2>Add Appointment</h2>
      <form
        onSubmit={handleSubmit}
        className="w-50 mb-3"
        style={{ minWidth: "250px" }}
      >
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            First name:
          </label>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            id="firstName"
            type="text"
            className="form-control"
            placeholder="first name"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last name:
          </label>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            id="lastName"
            type="text"
            className="form-control"
            placeholder="lastName"
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
        <div className="mb-3">
          <label htmlFor="trainings" className="form-label">
            Training
          </label>
          <select
            value={training.name}
            onChange={(e) => {
              e.stopPropagation();
              setTraining(e.target.value);
            }}
            id="trainings"
            className="form-select"
            required
          >
            <option defaultChecked>--Select a training--</option>
            {TRAININGS.map(({ id, name }) => (
              <option key={id} value={name}>
                {name}
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
            // step="900"
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
            // step="900"
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
        </div>

        {/* <div className="mb-3">
          <label htmlFor="intensity" className="form-label">
            Intensity
          </label>
          <DumbbellIntensity
            selectedDumbbells={intensity}
            id="intensity"
            value={intensity}
            onSelect={on}
            onChange={changeIntensity}
          />
        </div> */}
        <br />
        <div className="mb-3">
          <label htmlFor="specialRequest" className="form-label">
            Special request:
          </label>
          <textarea
            className="form-control"
            id="specialRequest"
            cols="1"
            rows="5"
            value={specialRequest}
            onChange={(e) => setSpecialRequest(e.target.value)}
          ></textarea>
          {/* <input
              value={specialRequest}
              onChange={(e) => setSpecialRequest(e.target.value)}
              id="specialRequest"
              type="textfield"
              className="form-control"
              placeholder="special Request"
              style={{ width: "200px", height: "100px", textAlign: "left" }}
            /> */}
        </div>
        {/* </div> */}
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
