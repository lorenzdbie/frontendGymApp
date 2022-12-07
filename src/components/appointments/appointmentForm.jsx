import { memo, useCallback, useEffect, useState } from "react";
import DumbbellIntensity from "/src/components/appointments/DumbellIntensity.jsx";
import {
  useForm,
  useFormContext,
  FormProvider,
  Controller,
} from "react-hook-form";
import { validationRules } from "/src/components/ValidationRules.jsx";
import useAppointments from "/src/api/appointments.jsx";
import useExercises from "/src/api/exercises.jsx";
import useUsers from "/src/api/users.jsx";
import { useNavigate, useParams } from "react-router";

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
    <>
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
      </div>
      {hasError ? (
        <div
          className="form-text text-danger"
          data-cy="labelInputAppointment-error"
        >
          {errors[name].message}
        </div>
      ) : null}
    </>
  );
}

function LabelTextArea({ label, name, type, placeholder, ...rest }) {
  const { register, errors, isSubmitting } = useFormContext();

  const hasError = name in errors;

  return (
    <>
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
      </div>
      {hasError ? (
        <div className="form-text text-danger" data-cy="labelTextArea-error">
          {errors[name].message}
        </div>
      ) : null}
    </>
  );
}

// function UserSelect(props) {
//   const name = "user";
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(null);
//   const [users, setUsers] = useState([]);
//   const usersApi = useUsers();

//   const { register, errors, isSubmitting } = useFormContext();

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const users = await usersApi.getAll();
//         setUsers(users);
//       } catch (error) {
//         console.log(error);
//         setError(error.message || "Something went wrong, try again later");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUsers();
//   }, []);

//   const hasError = name in errors;

//   return (
//     <>
//       <div className="d-flex flex-row  my-2">
//         <label htmlFor={name} className="form-label col-5 my-auto">
//           User:
//         </label>
//         <select
//           {...register(name)}
//           {...props}
//           id={name}
//           disabled={loading || error || isSubmitting}
//           className="form-select col smallOption rounded-5"
//         >
//           <option defaultChecked className="">
//             {loading ? "Loading users..." : error || "--Select User--"}
//           </option>
//           {users.map(({ id, firstName, lastName }) => (
//             <option key={id} value={id}>
//               {firstName + " " + lastName}
//             </option>
//           ))}
//         </select>
//       </div>
//       {hasError ? (
//         <div className="form-text text-danger">{errors[name].message}</div>
//       ) : null}
//     </>
//   );
// }

function IntensetySelect(props) {
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
              {...props}
            />
          </div>
        </div>
      )}
    />
  );
}

function ExerciseSelect(props) {
  const name = "training";
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [exercises, setExercises] = useState([]);
  const exercisesApi = useExercises();

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
    <>
      <div className="d-flex flex-row  my-2">
        <label htmlFor={name} className="form-label col-5 my-auto">
          Training:
        </label>
        <select
          {...register(name)}
          {...props}
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
      </div>
      {hasError ? (
        <div className="form-text text-danger">{errors[name].message}</div>
      ) : null}
    </>
  );
}

export default memo(function AppointmentForm({ refreshAppointments }) {
  const [error, setError] = useState(null);
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
  const navigate = useNavigate();
  const { id } = useParams();
  const appointmentsApi = useAppointments();

  const onSubmit = async (data) => {
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

    try {
      setError(null);
      await appointmentsApi.save({
        id,
        userId: user,
        date: new Date(date),
        trainingId: training,
        startTime: new Date(start),
        endTime: new Date(end),
        intensity: parseInt(intensity),
        specialRequest,
      });
      refreshAppointments();
      navigate("/appointments");
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  useEffect(() => {
    if (!id) {
      reset();
      return;
    }
    const fetchAppointment = async () => {
      try {
        setError(null);
        const appointment = await appointmentsApi.getById(id);
        setValue("user", `${appointment.user.id}`);
        setValue("date", toDateInputString(new Date(appointment.date)));
        setValue(
          "startTime",
          toTimeInputString(new Date(appointment.startTime))
        );
        setValue("endTime", toTimeInputString(new Date(appointment.endTime)));
        setValue("training", `${appointment.training.id}`);
        setValue("intensity", appointment.intensity);
        setValue("specialRequest", appointment.specialRequest);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };
    fetchAppointment();
    refreshAppointments();
  }, [id, reset, setValue]);

  return (
    <div className="d-flex flex-column col-12 ">
      <h2 className="text-center">
        {id ? "Save appointment:" : "Add appointment:"}
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
          {/* <UserSelect data-cy="user_input" /> */}
          <LabelInput
            label="date"
            name="date"
            type="date"
            defaultValue={new Date().toISOString().slice(0, 10)}
            data-cy="date_input"
          />
          <LabelInput
            label="startTime"
            name="startTime"
            type="time"
            defaultValue={new Date().toISOString().slice(11, 16)}
            min="08:00"
            max="18:30"
            data-cy="startTime_input"
          />
          <LabelInput
            label="endTime"
            name="endTime"
            type="time"
            defaultValue={new Date().toISOString().slice(11, 16)}
            min="08:30"
            max="19:00"
            data-cy="endTime_input"
          />
          <ExerciseSelect data-cy="training_input" />

          <IntensetySelect data-cy="intensity_input" />

          <LabelTextArea
            label="specialRequest"
            name="specialRequest"
            type="text"
            cols="1"
            rows="6"
            placeholder="special request"
            data-cy="specialRequest_input"
          />
          <div className="clearfix  my-4 d-flex flex-row justify-content-center">
            <div className="btn-group">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary rounded-5"
                data-cy="submit_appointment"
              >
                {id ? "Save appointment" : "Add appointment"}
              </button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
});
