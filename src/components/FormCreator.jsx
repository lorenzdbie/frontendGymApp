import { useFormContext } from "react-hook-form";
import { useState } from "react";
import { validationRules } from "./ValidationRules";
import { TRAININGS } from "../api/mock-data";
import { themes, useThemeColors } from "../contexts/Theme.context";
import { BiShowAlt, BiHide } from "react-icons/bi";

const labels = {
  firstName: "First name",
  lastName: "Last Name",
  email: "E-mail",
  password: "Password",
  confirmPassword: "Confirm Password",
  date: "Date",
  birthdate: "Date of birth",
  startTime: "Start-time",
  endTime: "End-time",
  specialRequest: "Special requests",
  muscleGroup: "Muscle groups",
  name: "Exercise name",
  weight: "Weight",
  height: "Height",
};

export function LabelInput({ label, name, type, placeholder, ...rest }) {
  const { register, errors } = useFormContext();
  const { theme, oppositeTheme } = useThemeColors();

  const hasError = name in errors;

  if (name === "registerCheckBox") {
    return (
      <div className={`d-flex flex-row my-2 border-${oppositeTheme}`}>
        <input
          {...register(name, validationRules[name])}
          type={type}
          className="form-check-label col-3 my-auto rounded-2"
        />
        I have read and agree to the terms and conditions
      </div>
    );
  }

  if (name === "password" || name === "confirmPassword") {
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className="d-flex flex-row my-2">
        <label htmlFor={name} className="form-label col-5 my-auto ">
          {labels[name]}:
        </label>
        <div className="password my-auto d-flex">
          <input
            {...register(name, validationRules[name])}
            id={name}
            type={showPassword ? "text" : "password"}
            className="form-control col-2 rounded-5"
            placeholder={placeholder}
          />
          <button
            className={`passwordButton bg-light text-dark`}
            type="button"
            onClick={togglePassword}
          >
            {showPassword ? <BiShowAlt /> : <BiHide />}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex flex-row my-2">
      <label htmlFor={name} className="form-label col-5 my-auto ">
        {labels[name]}:
      </label>
      <input
        {...register(name, validationRules[name])}
        id={name}
        type={type}
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

export function LabelTextArea({ label, name, type, placeholder, ...rest }) {
  const { register, errors } = useFormContext();

  const hasError = name in errors;

  if (name === "specialRequest" || name === "muscleGroup") {
    return (
      <div className="d-flex flex-column mt-0">
        <label htmlFor={name} className="form-label col-7">
          {labels[name]}:
        </label>
        <textarea
          {...register(name, validationRules[name])}
          id={name}
          type={type}
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
}

export function ExerciseSelect() {
  const name = "training";
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [exercises, setExercises] = useState([]);

  const { register, errors } = useFormContext();

  const hasError = name in errors;
  return (
    <div className="d-flex flex-row  my-2">
      <label htmlFor={name} className="form-label col-5 my-auto">
        Training:
      </label>
      <select
        {...register(name)}
        id={name}
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
      {hasError ? (
        <div className="form-text text-danger">{errors[name].message}</div>
      ) : null}
    </div>
  );
}
