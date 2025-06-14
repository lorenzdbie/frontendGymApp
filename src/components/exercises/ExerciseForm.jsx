import { useState } from "react";
import { useForm, useFormContext, FormProvider } from "react-hook-form";
import { validationRules } from "/src/components/ValidationRules.jsx";
import useExercises from "/src/api/exercises.jsx";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const labels = {
  name: "Exercise name",
  muscleGroup: "Muscle groups",
};

function LabelInput({ label, name, type, placeholder, ...rest }) {
  const { register, errors } = useFormContext();

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
          className="form-text text-end text-danger"
          data-cy="labelInput-error"
        >
          {errors[name].message}
        </div>
      ) : null}
    </>
  );
}

function LabelTextArea({ label, name, type, placeholder, ...rest }) {
  const { register, errors } = useFormContext();

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
          cols="1"
          rows="6"
          className="form-control col rounded-5"
          placeholder={placeholder}
          {...rest}
        />
      </div>
      {hasError ? (
        <div
          className="form-text text-end text-danger"
          data-cy="labelTextArea-error"
        >
          {errors[name].message}
        </div>
      ) : null}
    </>
  );
}

export default function ExerciseForm({ refreshExercises }) {
  const [error, setError] = useState(null);
  const {
    setValue,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const exercisesApi = useExercises();
  const navigate = useNavigate();
  const { id } = useParams();

  const onSubmit = async (data) => {
    const { name, muscleGroup } = data;

    try {
      setError(null);
      await exercisesApi.save({ id, name, muscleGroup });
      reset();
      toast.success(id ? "Exercise edited!" : "Exercise created!", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      refreshExercises();
      navigate("/exercises");
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  useEffect(() => {
    if (!id) {
      reset();
      return;
    }

    const fetchExercise = async () => {
      try {
        setError(null);
        const exercise = await exercisesApi.getById(id);
        setValue("name", exercise.name);
        setValue("muscleGroup", exercise.muscleGroup);
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
    };
    fetchExercise();
    refreshExercises();
  }, [id, setValue, reset]);

  return (
    <div className="d-flex flex-column col-12 ">
      <h2 className="text-center">
        {id ? "Save exercise: " : "Add exercise: "}
      </h2>
      <FormProvider
        handleSubmit={handleSubmit}
        errors={errors}
        register={register}
        isSubmitting={isSubmitting}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="my-3 justify-content-md-center formContainer"
        >
          <LabelInput
            label="name"
            name="name"
            type="text"
            placeholder="Exercise name"
            data-cy="exerciseName_input"
          />
          <LabelTextArea
            label="muscleGroup"
            name="muscleGroup"
            type="text"
            placeholder="Muscle groups"
            data-cy="muscleGroup_input"
          />
          <div className="clearfix my-4 d-flex flex-row justify-content-center">
            <div className="btn-group">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary rounded-5"
                data-cy="submit_exercise"
              >
                {id ? "Save exercise" : "Add exercise"}
              </button>
              <ToastContainer />
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
