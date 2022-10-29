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
    <>
      <h2>Add Appointment</h2>
      <form
        onSubmit={handleSubmit}
        className="w-60 mb-3"
        style={{ maxWidth: "90%", minWidth: "500px" }}
      >
        <div className="mb-3 form-group row">
          <label
            htmlFor="firstName"
            className="col-sm-5 col-form-label-lg form-label"
          >
            Enter first name:
          </label>
          <div className="col-sm-6 mb-3">
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              id="firstName"
              type="text"
              className="form-control form-control-lg"
              placeholder="first name"
              required
            />
          </div>
        </div>
        <div className="mb-3 form-group row">
          <label
            htmlFor="lastName"
            className="col-sm-5 col-form-label-lg form-label"
          >
            Last name:
          </label>
          <div className="col-sm-6 mb-3">
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              id="lastName"
              type="text"
              className="form-control form-control-lg"
              placeholder="lastName"
              required
            />
          </div>
        </div>
        <div className="mb-3 form-group row">
          <label
            htmlFor="date"
            className="col-sm-5 col-form-label-lg form-label"
          >
            Date:
          </label>
          <div className="col-sm-5 mb-3">
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              id="date"
              type="date"
              className="form-control form-control-lg"
            />
          </div>
        </div>
        <div className="mb-3 form-group row">
          <label
            htmlFor="trainings"
            className="col-sm-5 col-form-label-lg form-label"
          >
            Training:
          </label>
          <div className="col-sm-6 mb-3">
            <select
              value={training.name}
              onChange={(e) => {
                e.stopPropagation();
                setTraining(e.target.value);
              }}
              id="trainings"
              className="form-select form-select-lg"
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
        </div>
        <div className="mb-3 form-group row">
          <label
            htmlFor="startTime"
            className="col-sm-5 col-form-label-lg form-label"
          >
            Start Time:
          </label>
          <div className="col-sm-4 mb-3">
            <input
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              id="time"
              type="time"
              min="08:00"
              max="18:30"
              // step="900"
              className="form-control form-control-lg"
              required
            />
          </div>
        </div>
        <div className="mb-3 form-group row">
          <label
            htmlFor="endTime"
            className="col-sm-5 col-form-label-lg form-label"
          >
            End Time:
          </label>
          <div className="col-sm-4 mb-3">
            <input
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              id="time"
              type="time"
              min="08:30"
              max="19:00"
              // step="900"
              className="form-control form-control-lg"
              required
            />
          </div>
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

        <div className="form-group row">
          <label
            htmlFor="intensity"
            className="col-sm-5 col-form-label-lg form-label"
          >
            Intensity:
          </label>
          <div className="col-sm-4">
            <DumbbellIntensity
              selectedDumbbells={intensity}
              id="intensity"
              onRate={handleIntensity}
            />
          </div>
        </div>
        <div className="mb-3 form-group row">
          <label
            htmlFor="specialRequest"
            className="col-sm-5 col-form-label-lg form-label"
          >
            Special request:
          </label>
          <div className="col-sm-6 mt-3 mb-3 clear-fix">
            <div className="col-sm-12 float-end">
              <textarea
                className="form-control form-control"
                id="specialRequest"
                cols="1"
                rows="6"
                type="text"
                value={specialRequest}
                onChange={(e) => setSpecialRequest(e.target.value)}
                placeholder="If you have any special requests, please enter them here"
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
          </div>
        </div>
        {/* </div> */}
        <div className="clearfix">
          <div className="btn-group float-center">
            <button type="submit" className="btn btn-primary">
              Add Appointment
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
