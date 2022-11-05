// import { useState } from "react";
import { memo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { LabelInput, LabelTextArea } from "../FormCreator";

export default memo(function ExerciseForm({ onSaveExercise }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    onSaveExercise(data.name, data.muscleGroup);
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
