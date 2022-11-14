// import { useState } from "react";
import { memo } from "react";
import { useForm, useFormContext, FormProvider } from "react-hook-form";
import { validationRules } from "../ValidationRules";

const labels = {
  name: "Exercise name",
  muscleGroup: "Muscle groups",
};

function LabelInput({ label, name, type, placeholder, ...rest }) {
  const { register, errors } = useFormContext();

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
};

function LabelTextArea({ label, name, type, placeholder, ...rest }) {
  const { register, errors } = useFormContext();

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
};

export default memo(function ExerciseForm({ onSaveExercise }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { name, muscleGroup} = data;
    onSaveExercise({name,muscleGroup});
    reset();
  };

  return (
    <div className="d-flex flex-column col-12 ">
      <h2 className="text-center">Add exercise</h2>
      <FormProvider
        handleSubmit={handleSubmit}
        errors={errors}
        register={register}
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
          />
          <LabelTextArea
            label="muscleGroup"
            name="muscleGroup"
            type="text"
            placeholder="Muscle groups"
          />
          <div className="clearfix my-4 d-flex flex-row justify-content-center">
            <div className="btn-group">
              <button type="submit" className="btn btn-primary rounded-5">
                Add Exercise
              </button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
});
