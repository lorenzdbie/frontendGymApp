import { memo, useCallback, useEffect, useState } from "react";
import DumbbellIntensity from "./DumbellIntensity";
import {
  useForm,
  useFormContext,
  FormProvider,
  Controller,
} from "react-hook-form";
import { validationRules } from "../ValidationRules";
import * as exercisesApi from "../../api/exercises";
import * as usersApi from "../../api/users";
import Error from "../Error";

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

const labels = {
  date: "Date",
  startTime: "Start-time",
  endTime: "End-time",
  specialRequest: "Special requests",
};

function LabelInput({ label, name, type, placeholder, ...rest }) {
  const { register, errors, isSubmitting } = useFormContext();

  const hasError = name in errors;

  return (
    <div className="d-flex flex-row my-2">
      <label htmlFor={name} className="form-label col-5 my-auto ">
        {labels[name]}:
      </label>
      <input
        {...register(name, validationRules[name])}
        id={name}
        type={type}
        disabled={isSubmitting}
        className="form-control col rounded-5 my-auto"
        placeholder={placeholder ? placeholder : null}
        {...rest}
      />
      {name === "weight" ? (
        <span className="my-auto form-label">&nbsp;kg</span>
      ) : null}
      {name === "height" ? (
        <span className="my-auto form-label">&nbsp;cm</span>
      ) : null}
      {hasError ? (
        <div className="form-text text-danger">{errors[name].message}</div>
      ) : null}
    </div>
  );
}

function LabelTextArea({ label, name, type, placeholder, ...rest }) {
  const { register, errors, isSubmitting } = useFormContext();

  const hasError = name in errors;

  return (
    <div className="d-flex flex-column mt-0">
      <label htmlFor={name} className="form-label col-7">
        {labels[name]}:
      </label>
      <textarea
        {...register(name, validationRules[name])}
        id={name}
        type={type}
        disabled={isSubmitting}
        cols="1"
        rows="6"
        className="form-control col rounded-5"
        placeholder={placeholder}
        {...rest}
      />
      {hasError ? (
        <div className="form-text text-danger">{errors[name].message}</div>
      ) : null}
    </div>
  );
}

function UserSelect() {
  const name = "user";
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [users, setUsers] = useState([]);

  const { register, errors, isSubmitting } = useFormContext();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const users = await usersApi.getAll();
        setUsers(users);
      } catch (error) {
        console.log(error);
        setError(error.message || "Something went wrong, try again later");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const hasError = name in errors;

  return (
    <div className="d-flex flex-row  my-2">
      <label htmlFor={name} className="form-label col-5 my-auto">
        User:
      </label>
      <select
        {...register(name)}
        id={name}
        disabled={loading || error || isSubmitting}
        className="form-select col smallOption rounded-5"
      >
        <option defaultChecked>
          {loading ? "Loading users..." : error || "--Select User--"}
        </option>
        {users.map(({ id, firstName, lastName }) => (
          <option key={id} value={id}>
            {firstName + " " + lastName}
          </option>
        ))}
      </select>
      {hasError ? (
        <div className="form-text text-danger">{errors[name].message}</div>
      ) : null}
    </div>
  );
}

function IntensetySelect() {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name="intensity"
      render={({ field: { value, onChange } }) => (
        <div className="d-flex flex-row mb-0 ">
          <label htmlFor="intensity" className="form-label mt-1 col-5">
            Intensity:
          </label>
          <div className="col text-center">
            <DumbbellIntensity
              selectedDumbbells={value}
              id="intensity"
              onRate={onChange}
            />
          </div>
        </div>
      )}
    />
  );
}

function ExerciseSelect() {
  const name = "training";
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [exercises, setExercises] = useState([]);

  const { register, errors, isSubmitting } = useFormContext();

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        setLoading(true);
        setError(null);
        const exercises = await exercisesApi.getAll();
        setExercises(exercises);
      } catch (error) {
        console.log(error);
        setError(error.message || "Something went wrong, try again later");
      } finally {
        setLoading(false);
      }
    };
    fetchExercises();
  }, []);

  const hasError = name in errors;
  return (
    <div className="d-flex flex-row  my-2">
      <label htmlFor={name} className="form-label col-5 my-auto">
        Training:
      </label>
      <select
        {...register(name)}
        id={name}
        disabled={loading || error || isSubmitting}
        className="form-select col smallOption rounded-5"
      >
        <option defaultChecked>
          {loading ? "Loading exercises..." : error || "--Select Training--"}
        </option>
        {exercises.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
      {hasError ? (
        <div className="form-text text-danger">{errors[name].message}</div>
      ) : null}
    </div>
  );
}

export default memo(function AppointmentForm({
  currentAppontment,
  onSaveAppointment,
}) {
  const {
    setValue,
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      intensity: 0,
    },
  });

  const onSubmit = (data) => {
    console.log(JSON.stringify(errors));
    const {
      date,
      user,
      training,
      startTime,
      endTime,
      intensity,
      specialRequest,
    } = data;
    const start = addTimeToDate(date, startTime);
    const end = addTimeToDate(date, endTime);

    let appointment = {
      userId: user,
      date: new Date(date),
      trainingId: training,
      startTime: new Date(start),
      endTime: new Date(end),
      intensity: parseInt(intensity),
      specialRequest,
    };
    onSaveAppointment({ ...appointment, id: currentAppontment?.id });
    reset();
  };

  useEffect(() => {
    if (
      currentAppontment &&
      (Object.keys(currentAppontment).length !== 0 ||
        currentAppontment.constructor !== Object)
    ) {
      const dateAsString = toDateInputString(new Date(currentAppontment.date));
      const startTimeAsString = toTimeInputString(
        new date(currentAppontment.startTime)
      );
      const endTimeAsString = toTimeInputString(
        new date(currentAppontment.endTime)
      );
      console.log("appointmentId: ", currentAppontment.id);

      setValue("user", `${currentAppontment.user.id}`);
      console.log("user id: ", currentAppontment.user.id);

      setValue("date", dateAsString);
      console.log("date: ", dateAsString);

      setValue("startTime", startTimeAsString);
      console.log("startTime: ", startTimeAsString);

      setValue("endTime", endTimeAsString);
      console.log("endTime: ", endTimeAsString);

      setValue("training", `${currentAppontment.training.id}`);
      console.log("training: ", currentAppontment.training.id);

      setValue("intensity", currentAppontment.intensity);
      console.log("intensity: ", currentAppontment.intensity);

      setValue("specialRequest", currentAppontment.specialRequest);
      console.log("specialRequest: ", currentAppontment.specialRequest);
    } else {
      reset();
    }
  }, [currentAppontment, setValue, reset]);

  return (
    <div className="d-flex flex-column col-12 ">
      <h2 className="text-center">
        {currentAppontment?.id ? "Save appointment:" : "Add appointment:"}
      </h2>
      <FormProvider
        handleSubmit={handleSubmit}
        errors={errors}
        register={register}
        control={control}
        isSubmitting={isSubmitting}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mb-3 justify-content-md-center formContainer"
        >
          <UserSelect />
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

          <IntensetySelect />

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
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary rounded-5"
              >
                {currentAppontment?.id ? "Save appointment" : "Add appointment"}
              </button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
});
