import { memo, useCallback, useState } from "react";
import DumbbellIntensity from "./dumbellIntensity";
import { useForm, FormProvider } from "react-hook-form";
import { LabelInput, LabelTextArea, ExerciseSelect } from "../FormCreator";

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
  const [intensity, setIntensity] = useState(0);

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
  };

  return (
    <div className="d-flex flex-column col-12 ">
      <h2 className="text-center">Add Appointment:</h2>
      <FormProvider
        handleSubmit={handleSubmit}
        errors={errors}
        register={register}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mb-3 justify-content-md-center formContainer"
        >
          <LabelInput
            label="firstName"
            name="firstName"
            type="text"
            placeholder="first name"
          />
          <LabelInput
            label="lastName"
            name="lastName"
            type="text"
            placeholder="last name"
          />
          <LabelInput
            label="date"
            name="date"
            type="date"
            defaultValue={new Date().toISOString().slice(0, 10)}
          />
          <LabelInput
            label="startTime"
            name="startTime"
            type="time"
            defaultValue={new Date().toISOString().slice(11, 16)}
            min="08:00"
            max="18:30"
          />
          <LabelInput
            label="endTime"
            name="endTime"
            type="time"
            defaultValue={new Date().toISOString().slice(11, 16)}
            min="08:30"
            max="19:00"
          />
          <ExerciseSelect />

          <div className="d-flex flex-row mb-0 ">
            <label htmlFor="intensity" className="form-label mt-1 col-5">
              Intensity:
            </label>
            <div className="col text-center">
              <DumbbellIntensity
                selectedDumbbells={intensity}
                id="intensity"
                onRate={handleIntensity}
                className=""
              />
            </div>
          </div>
          <LabelTextArea
            label="specialRequest"
            name="specialRequest"
            type="text"
            cols="1"
            rows="6"
            placeholder="special request"
          />
          <div className="clearfix  my-4 d-flex flex-row justify-content-center">
            <div className="btn-group">
              <button type="submit" className="btn btn-primary rounded-5">
                Add Appointment
              </button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
});
