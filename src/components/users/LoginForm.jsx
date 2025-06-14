// import { useState } from "react";
// import { validationRules } from "/src/components/ValidationRules.jsx";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { themes, useThemeColors } from "/src/contexts/Theme.context";
// import { BiShowAlt, BiHide } from "react-icons/bi";
import LoginButton from "/src/components/authentication/LoginButton.jsx";
import LogoutButton from "/src/components/authentication/LogoutButton.jsx";
import { useAuth0 } from "@auth0/auth0-react";

// const labels = {
//   email: "E-mail",
//   password: "Password",
// };

// function LabelInput({ label, name, type, placeholder, ...rest }) {
//   const { register, errors } = useFormContext();

//   const hasError = name in errors;

//   if (name === "password") {
//     const [showPassword, setShowPassword] = useState(false);

//     const togglePassword = () => {
//       setShowPassword(!showPassword);
//     };

//     return (
//       <div className="d-flex flex-col mb-4">
//         {/* <label htmlFor={name} className="form-label col-5 my-auto hide">
//           {labels[name]}:
//         </label> */}
//         <div className="password my-auto d-flex">
//           <input
//             {...register(name, validationRules[name])}
//             id={name}
//             type={showPassword ? "text" : "password"}
//             className="form-control col-2 rounded-5"
//             placeholder={placeholder}
//           />
//           <button
//             className={`passwordButton bg-light text-dark`}
//             type="button"
//             onClick={togglePassword}
//           >
//             {showPassword ? <BiShowAlt /> : <BiHide />}
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="d-flex flex-col my-3">
//       {/* <label htmlFor={name} className="form-label col-5 my-auto ">
//         {labels[name]}:
//       </label> */}
//       <input
//         {...register(name, validationRules[name])}
//         id={name}
//         type={type}
//         className="form-control col rounded-5 my-auto"
//         placeholder={placeholder ? placeholder : null}
//         {...rest}
//       />
//       {name === "weight" ? (
//         <span className="my-auto form-label">&nbsp;kg</span>
//       ) : null}
//       {name === "height" ? (
//         <span className="my-auto form-label">&nbsp;cm</span>
//       ) : null}
//       {hasError ? (
//         <div className="form-text text-danger">{errors[name].message}</div>
//       ) : null}
//     </div>
//   );
// }

function LoginLogoutButton(){
const { isAuthenticated} = useAuth0();
if (isAuthenticated) {
  return <LogoutButton />;
}
return <LoginButton />;

}


export default function LoginForm({ onSaveLogin }) {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const { theme } = useThemeColors();

  const {
    // register,
    // handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (e) => {
    e.preventDefault();
    onSaveLogin(email, password);
    reset();
  };

  return (
    <>
      <div className="d-flex flex-row justify-content-center mb-3">
        <picture>
          {theme === themes.dark ? (
            <img
              src="/logos/LogoSmallInvert-removebg.png"
              alt="logo loginScreen"
            />
          ) : (
            <img
              src="/logos/LogoSmall-removebg.png"
              alt="logo loginScreen"
            />
          )}
        </picture>
      </div>
      
      <div className="d-flex flex-row justify-content-center align-items-start">
        {/* <FormProvider
          handleSubmit={handleSubmit}
          errors={errors}
          register={register}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <LabelInput
              label="email"
              name="email"
              type="email"
              placeholder="e-mail"
              id="login"
            />
            <LabelInput
              label="password"
              name="password"
              type="password"
              placeholder="password"
              id="login"
            />
            <div className="clearfix d-flex flex-row justify-content-evenly mt-3">
              <button
                type="submit"
                className="btn btn-primary rounded-5"
                data-cy="submit_login"
                style={{ margin: "0 auto", backgroundColor: "blue" }}
              >
                Login
              </button>
              <button
                type="button"
                className="btn btn-primary rounded-5"
                data-cy="signUp"
                style={{ margin: "0 auto", backgroundColor: "red" }}
              >
                <Link to={"/register"} className="text-light">
                  {" "}
                  SignUp
                </Link>
              </button>
            </div>
          </form>
        </FormProvider> */}
        <div className="clearfix d-flex flex-row justify-content-evenly mt-3">
          <LoginLogoutButton />
        </div>
      </div>
    </>
  );
}
