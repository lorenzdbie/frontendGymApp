import { useCallback, useState } from "react";
import { TRAININGS } from "../../api/mock-data";
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

export default function AppointmentForm({
  onSaveAppointment,
  onRate = (f) => f,
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [training, setTraining] = useState("");
  const [startTime, setStartTime] = useState(
    new Date().toISOString().slice(11, 16)
  );
  const [endTime, setEndTime] = useState(
    new Date().toISOString().slice(11, 16)
  );
  const [intensity, setIntensity] = useState(0);
  const [specialRequest, setSpecialRequest] = useState("");

  const handleIntensity = (newIntensity) => {
    onRate(setIntensity(newIntensity));
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
    <div className="d-flex flex-column col-12 ">
      <h2>Add Appointment:</h2>
      <form
        onSubmit={handleSubmit}
        className="mb-3 justify-content-md-center formContainer"
        // style={{ maxWidth: "90%", Width: "500px" }}
      >
        <div className="d-flex flex-row">
          <label htmlFor="firstName" className="form-label col-5 my-auto ">
            First name:
          </label>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            id="firstName"
            type="text"
            className="form-control col rounded-5"
            placeholder="first name"
            required
          />
        </div>
        <div className="d-flex flex-row">
          <label htmlFor="lastName" className="form-label col-5 my-auto">
            Last name:
          </label>

          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            id="lastName"
            type="text"
            className="form-control col rounded-5"
            placeholder="last name"
            required
          />
        </div>
        <div className="d-flex flex-row">
          <label htmlFor="date" className="form-label col-5 my-auto">
            Date:
          </label>

          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            id="date"
            type="date"
            className="form-control col rounded-5"
            required
          />
        </div>
        <div className="d-flex flex-row">
          <label htmlFor="trainings" className="form-label col-5 my-auto">
            Training:
          </label>

          <select
            value={training.name}
            onChange={(e) => {
              e.stopPropagation();
              setTraining(e.target.value);
            }}
            id="trainings"
            className="form-select col smallOption rounded-5"
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
        <div className="d-flex flex-row">
          <label htmlFor="startTime" className="form-label col-5 my-auto">
            Start Time:
          </label>

          <input
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            id="time"
            type="time"
            min="08:00"
            max="18:30"
            className="form-control col rounded-5"
            required
          />
        </div>
        <div className="d-flex flex-row">
          <label htmlFor="endTime" className="form-label col-5 my-auto">
            End Time:
          </label>

          <input
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            id="time"
            type="time"
            min="08:30"
            max="19:00"
            step="900"
            className="form-control col rounded-5"
            required
          />
        </div>

        {/* <div className="mb-3">
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
        </div> */}

        <div className="d-flex flex-row mb-0">
          <label htmlFor="intensity" className="form-label mt-1 col-5">
            Intensity:
          </label>
          <div className="col">
            <DumbbellIntensity
              selectedDumbbells={intensity}
              id="intensity"
              onRate={handleIntensity}
              className=""
            />
          </div>
        </div>
        <div className="d-flex flex-column mt-0">
          <label htmlFor="specialRequest" className="form-label col-7">
            Special request:
          </label>

          <textarea
            className="form-control col rounded-5"
            id="specialRequest"
            cols="1"
            rows="6"
            type="text"
            value={specialRequest}
            onChange={(e) => setSpecialRequest(e.target.value)}
            placeholder="If you have any special requests, please enter them here..."
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
        <div className="clearfix  my-4">
          <div className="btn-group float-center">
            <button type="submit" className="btn btn-primary rounded-5">
              Add Appointment
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
