import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { LabelInput } from "../FormCreator";
import { themes, useThemeColors } from "../../contexts/Theme.context";

export default function LoginForm({ onSaveLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { theme} = useThemeColors();

  const {
    register,
    handleSubmit,
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

        {theme === themes.dark ? 
            <img
              src="/src/assets/LogoSmallInvert-removebg.png"
              alt="logo loginScreen"
            />
           : 
            <img src="/src/assets/LogoSmall-removebg.png" alt="logo loginScreen" />
          }


          
        </picture>
      </div>
      <h2 className="text-center">Login / SignUp</h2>
      <div className="d-flex flex-row justify-content-center align-items-start">
        <FormProvider
          handleSubmit={handleSubmit}
          errors={errors}
          register={register}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mb-3 justify-content-md-center formContainer loginlabels"
          >
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
                style={{ margin: "0 auto", backgroundColor: "blue" }}
              >
                Login
              </button>
              <button
                type="button"
                onClick=""
                className="btn btn-primary rounded-5"
                style={{ margin: "0 auto", backgroundColor: "red" }}
              >
                SignUp
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
}
