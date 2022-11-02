import { memo, useCallback, useState } from "react";
import { TRAININGS } from "../../api/mock-data";
import DumbbellIntensity from "./dumbellIntensity";
import { useForm } from "react-hook-form";
import { validationRules } from "../ValidationRules";


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

export default memo(function AppointmentForm({
  onSaveAppointment,
  onRate = (f) => f,
}) {
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  // const [training, setTraining] = useState("");
  // const [startTime, setStartTime] = useState(
  //   new Date().toISOString().slice(11, 16)
  // );
  // const [endTime, setEndTime] = useState(
  //   new Date().toISOString().slice(11, 16)
  // );
  const [intensity, setIntensity] = useState(0);
  // const [specialRequest, setSpecialRequest] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleIntensity = (newIntensity) => {
    onRate(setIntensity(newIntensity));
  };

  const onSubmit = (data) => {
    console.log(JSON.stringify(errors));
    onSaveAppointment(
      data.firstName,
      data.lastName,
      data.date,
      data.training,
      addTimeToDate(data.date, data.startTime),
      addTimeToDate(data.date, data.endTime),
      intensity,
      data.specialRequest
    );
    reset();
    // e.preventDefault();
    // const start = addTimeToDate(date, startTime);
    // const end = addTimeToDate(date, endTime);
    // onSaveAppointment(
    //   firstName,
    //   lastName,
    //   date,
    //   training,
    //   start,
    //   end,
    //   intensity,
    //   specialRequest
    // );
    // setFirstName("");
    // setLastName("");
    // setDate(new Date().toISOString().slice(0, 10));
    // setTraining("--Select training--");
    // setStartTime("");
    // setEndTime("");
    // setIntensity(0);
    // setSpecialRequest("");
  };




  return (
    <div className="d-flex flex-column col-12 ">
      <h2 className="text-center">Add Appointment:</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-3 justify-content-md-center formContainer"
      >
        <div className="d-flex flex-row my-2">
          <label htmlFor="firstName" className="form-label col-5 my-auto ">
            First name:
          </label>
          <input
            {...register("firstName", validationRules.firstName)}
            id="firstName"
            type="text"
            className="form-control col rounded-5"
            placeholder="first name"
          />
        </div>
        <div className="d-flex flex-row  my-2">
          <label htmlFor="lastName" className="form-label col-5 my-auto">
            Last name:
          </label>
          <input
            {...register("lastName", validationRules.lastName)}
            id="lastName"
            type="text"
            className="form-control col rounded-5"
            placeholder="last name"
          />
        </div>
        <div className="d-flex flex-row  my-2">
          <label htmlFor="date" className="form-label col-5 my-auto">
            Date:
          </label>
          <input
            {...register("date", validationRules.date)}
            defaultValue={new Date().toISOString().slice(0, 10)}
            id="date"
            type="date"
            className="form-control col rounded-5"
          />
        </div>
        <div className="d-flex flex-row  my-2">
          <label htmlFor="training" className="form-label col-5 my-auto">
            Training:
          </label>
          <select
            {...register("training", validationRules.training.name)}
            id="training"
            className="form-select col smallOption rounded-5"
          >
            <option defaultChecked value="">
              --Select training--&nbsp;&nbsp;
            </option>
            {TRAININGS.map(({ id, name }) => (
              <option key={id} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div className="d-flex flex-row  my-2">
          <label htmlFor="startTime" className="form-label col-5 my-auto">
            Start Time:
          </label>
          <input
            {...register("startTime", validationRules.startTime)}
            defaultValue={new Date().toISOString().slice(11, 16)}
            id="time"
            type="time"
            min="08:00"
            max="18:30"
            className="form-control col rounded-5"
          />
        </div>
        <div className="d-flex flex-row  my-2">
          <label htmlFor="endTime" className="form-label col-5 my-auto">
            End Time:
          </label>
          <input
            {...register("endTime", validationRules.endTime)}
            defaultValue={new Date().toISOString().slice(11, 16)}
            id="time"
            type="time"
            min="08:30"
            max="19:00"
            step="900"
            className="form-control col rounded-5"
          />
        </div>
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
            {...register("specialRequest", validationRules.specialRequest)}
            placeholder="If you have any special requests, please enter them here..."
          ></textarea>
        </div>
        <div className="clearfix  my-4 d-flex flex-row justify-content-center">
          <div className="btn-group">
            <button type="submit" className="btn btn-primary rounded-5">
              Add Appointment
            </button>
          </div>
        </div>
      </form>
    </div>
  );
});
