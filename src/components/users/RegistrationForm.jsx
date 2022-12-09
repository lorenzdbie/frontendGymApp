import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { useState } from "react";
import { validationRules } from "/src/components/ValidationRules.jsx";
import { themes, useThemeColors } from "/src/contexts/Theme.context.jsx";
import { BiShowAlt, BiHide } from "react-icons/bi";
// import { Link } from "react-router-dom";
import useUsers from "/src/api/users.jsx";
import { useNavigate } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { toDateInputString } from "/src/components/afspraken/AfspraakForm";

const labels = {
  firstName: "First name",
  lastName: "Last Name",
  email: "E-mail",
  birthdate: "Date of birth",
  weight: "Weight",
  height: "Height",
};

function LabelInput({ label, name, type, placeholder, ...rest }) {
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
        <div className="form-text text-end text-danger">
          {errors[name].message}
        </div>
      ) : null}
    </>
  );
}

export default function RegistrationForm() {
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const {
    setValue,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const usersApi = useUsers();
  const navigate = useNavigate();
  const { user } = useAuth0();

  let id;

  const onSubmit = async (data) => {
    const { firstName, lastName, birthdate, weight, height } = data;
    const { email } = user;

    console.log(userId);

    try {
      setError(null);
      await usersApi.register({
        id: userId,
        firstName,
        lastName,
        email,
        birthdate: new Date(birthdate),
        weight,
        height,
      });
      // refreshUsers();
      toast.success("Registration successful!", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
     
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setError(null);
        const user = await usersApi.getUserByAuthId();
        const id = user.id;
        setUserId(id);
        // console.log(`id: ${id}`);
        // console.log(`userid: ${userId}`);
        if (id) {
          setValue("firstName", user.firstName);
          setValue("lastName", user.lastName);
          setValue("birthdate", toDateInputString(new Date(user.birthdate)));
          setValue("weight", user.weight);
          setValue("height", user.height);
        }
      } catch (error) {
        setError(error);
      }
    };
    fetchUsers();
  }, [setValue, reset]);

  return (
    <div className="d-flex flex-column col-12">
      <h2 className="text-center">Add additional account information:</h2>
      <FormProvider
        handleSubmit={handleSubmit}
        errors={errors}
        register={register}
        isSubmitting={isSubmitting}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mb-3 mx-auto formContainer"
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
            label="birthdate"
            name="birthdate"
            type="date"
            defaultValue={new Date().toISOString().slice(0, 10)}
          />
          <LabelInput
            label="weight"
            name="weight"
            type="number"
            placeholder="weight"
            step="0.1"
          />
          <LabelInput
            label="height"
            name="height"
            type="number"
            placeholder="height"
            step="0.1"
          />
          <LabelInput
            label="registerCheckBox"
            name="registerCheckBox"
            type="checkbox"
          />

          <div className="mt-3 clearfix">
            <div className="btn-group float-end">
              <button
                type="submit"
                label="submit"
                disabled={isSubmitting}
                className="btn btn-primary rounded-5"
                style={{ margin: "0 20px", backgroundColor: "blue" }}
              >
                Add information
              </button>
              <ToastContainer />
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}