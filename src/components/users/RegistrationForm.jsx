import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { useState } from "react";
import { validationRules } from "../ValidationRules.jsx";
import { themes, useThemeColors } from "../../contexts/Theme.context.jsx";
import { BiShowAlt, BiHide } from "react-icons/bi";
// import { Link } from "react-router-dom";
import useUsers from "../../api/users.jsx";
import { useNavigate } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";

const labels = {
  firstName: "First name",
  lastName: "Last Name",
  email: "E-mail",
  password: "Password",
  confirmPassword: "Confirm Password",
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

export default function RegistrationForm(/* { onSaveRegistration } */) {
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const usersApi = useUsers();
  const navigate = useNavigate();
  const { user } = useAuth0();

  // const onSubmit = (data) => {
  //   console.log(JSON.stringify(data));
  //   onSaveRegistration(
  //     data.firstName,
  //     data.lastName,
  //     data.birthdate,
  //     data.email,
  //     data.password,
  //     data.weight,
  //     data.height
  //   );
  //   reset();
  // };

  const onSubmit = async (data) => {
    const { firstName, lastName, birthdate, weight, height } = data;
    const { email } = user;

    try {
      setError(null);
      await usersApi.register({
        firstName,
        lastName,
        email,
        birthdate: new Date(birthdate),
        weight,
        height,
      });
      // refreshUsers();
      navigate("/appointments");
    } catch (error) {
      setError(error);
    }
  };

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
          {/* <LabelInput
            label="email"
            name="email"
            type="email"
            placeholder="e-mail"
          /> */}
          {/* <LabelInput
            label="password"
            name="password"
            type="password"
            placeholder="password"
          />
          <LabelInput
            label="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Password"
          /> */}
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
            {/* <div className="btn-group float-end">
              <button
                className="btn btn-primary rounded-5"
                style={{ margin: "0 20px", backgroundColor: "gray" }}
              >
                <Link to={"/Login"} className="text-light">
                  {" "}
                  Cancel
                </Link>
              </button>
            </div> */}
            <div className="btn-group float-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary rounded-5"
                style={{ margin: "0 20px", backgroundColor: "blue" }}
              >
                Sign-up
              </button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

//         <div className="d-flex flex-row my-2">
//           <label htmlFor="firstName" className="form-label col-5 my-auto ">
//             First name:
//           </label>
//           <input
//             {...register("firstName", validationRules.firstName)}
//             id="firstName"
//             type="text"
//             className="form-control col rounded-5"
//             placeholder="first name"
//           />
//         </div>
//         <div className="d-flex flex-row my-2">
//           <label htmlFor="lastName" className=" form-label col-5 my-auto ">
//             Last name:
//           </label>

//           <input
//             {...register("lastName", validationRules.lastName)}
//             id="lastName"
//             type="text"
//             className="form-control col rounded-5 "
//             placeholder="last name"
//           />
//         </div>

//         <div className="d-flex flex-row my-2">
//           <label htmlFor="date" className="form-label col-5 my-auto ">
//             Birthdate:
//           </label>

//           <input
//             {...register("birthdate", validationRules.birthdate)}
//             defaultValue={new Date().toISOString().slice(0, 10)}
//             id="birthdate"
//             type="date"
//             className="form-control col rounded-5"
//           />
//         </div>

//         <div className="d-flex flex-row my-2">
//           <label htmlFor="e-mail" className="form-label col-5 my-auto ">
//             Enter e-mail:
//           </label>

//           <input
//             {...register("email", validationRules.email)}
//             id="email"
//             type="email"
//             className="form-control col rounded-5"
//             placeholder="abc@123.com"
//           />
//         </div>

//         <div className="d-flex flex-row my-2">
//           <label htmlFor="password" className="form-label col-5 my-auto ">
//             password:
//           </label>

//           <input
//             {...register("password", validationRules.password)}
//             id="password"
//             type="password"
//             className="form-control col rounded-5"
//             placeholder="password"
//           />
//         </div>

//         <div className="d-flex flex-row my-2">
//           <label htmlFor="confirmPassword" className="form-label col-5 my-0 ">
//             Repeat password:
//           </label>

//           <input
//             {...register(
//               "confirmPassword", validationRules.confirmPassword
//             )}
//             id="confirmPassword"
//             type="password"
//             className="form-control col rounded-5 my-auto"
//             placeholder="password"
//           />
//         </div>

//         <div className="d-flex flex-row my-2">
//           <label htmlFor="weight" className="form-label col-5 my-auto ">
//             Body weight:
//           </label>

//           <input
//             {...register("weight", validationRules.weight)}
//             id="weight"
//             type="number"
//             step="0.1"
//             className="form-control col bodyHW rounded-5"
//             placeholder="weight"
//           />
//           <span className="my-auto form-label"> &nbsp;kg</span>
//         </div>
//         <div className="d-flex flex-row my-2">
//           <label htmlFor="weight" className="form-label col-5 my-auto ">
//             Body height:
//           </label>

//           <input
//             {...register("height", validationRules.height)}
//             id="height"
//             type="number"
//             step="0.1"
//             className="form-control col rounded-5"
//             placeholder="height"
//           />
//           <span className="my-auto form-label"> &nbsp;cm</span>
//         </div>
//         <div className="d-flex flex-row my-2">
//           <input
//             {...register("registerCheckBox", validationRules.registerCheckBox)}
//             type="checkbox"
//             className="form-check-label col-3 my-auto rounded-2"
//           />
//           I have read and agree to the terms and conditions
//         </div>

//         <div className="clearfix">
//           <div className="btn-group float-end">
//             <button
//               className="btn btn-primary rounded-5"
//               style={{ margin: "0 20px", backgroundColor: "gray" }}
//             >
//               Cancel
//             </button>
//           </div>
//           <div className="btn-group float-end">
//             <button
//               type="submit"
//               className="btn btn-primary rounded-5"
//               style={{ margin: "0 20px", backgroundColor: "blue" }}
//             >
//               Sign-up
//             </button>
//           </div>
//         </div>
//         {errors.firstName && <p className="form-text text-danger">{errors.firstName.message}</p>}
//         {errors.lastName && <p className="form-text text-danger">{errors.lastName.message}</p>}
//         {errors.birthdate && <p className="form-text text-danger">{errors.birthdate.message}</p>}
//         {errors.email && <p className="form-text text-danger">{errors.email.message}</p>}
//         {errors.password && <p className="form-text text-danger">{errors.password.message}</p>}
//         {errors.confirmPassword && <p className="form-text text-danger">{errors.confirmPassword.message}</p>}
//         {errors.weight && <p className="form-text text-danger">{errors.weight.message}</p>}
//         {errors.height && <p className="form-text text-danger">{errors.height.message}</p>}
//         {errors.registerCheckBox && <p className="form-text text-danger">{errors.registerCheckBox.message}</p>}

//       </form>
//     </div>
//   );
// }
