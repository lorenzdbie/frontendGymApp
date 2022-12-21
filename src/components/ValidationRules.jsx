export const validationRules = {
  name: {
    required: "Name is a required field",
    minLength: { value: 2, message: "Name must be at least 2 characters long" },
    maxLength: { value: 30, message: "Name can only be 30 characters long" },
  },
  muscleGroup: {
    required: "Muscle groups is a required field",
    minLength: {
      value: 3,
      message: "Muscle group must be at least 3 characters long",
    },
    maxLength: {
      value: 100,
      message: "Muscle group can only be 100 characters long",
    },
  },
  firstName: {
    required: "first name is a required field",
    minLength: { value: 2, message: "Name must be at least 2 characters long" },
    maxLength: { value: 20, message: "Name can only be 20 characters long" },
  },
  lastName: {
    required: "Last name is a required field",
    minLength: { value: 2, message: "Name must be at least 2 characters long" },
    maxLength: { value: 20, message: "Name can only be 20 characters long" },
  },
  date: {
    required: "Date is a required field",
    validate: (value) => {
      const date = new Date(value);
      const today = new Date().setHours(0, 0, 0, 0);
      if (date < today) {
        return "Date must be in the future";
      }
    },
  },
  training: {
    name: {
      required: "this is a required field",
    },
  },
  startTime: {
    validate: (value) => {
      const time = value.toString();
      if (time < "08:00") {
        return "Start time must be after 8:00";
      }
      if (time > "20:00") {
        return "Start time must be before 20:00";
      }
    },
  },
  endTime: {
    validate: (value) => {
      const time = value.toString();
      if (time < "08:30") {
        return "End time must be after 8:30";
      }
      if (time > "21:00") {
        return "End time must be before 21:00";
      }
    },
  },
  intensity: {
    validate: (value) => {
      if (value == 0) {
        return "Choose an intensity level";
      }
    },
  },
  specialRequest: { maxLength: { value: 320, message: "320 characters max" } },
  birthdate: {
    valueAsDate: true,
    required: "this is a required field",
    validate: (value) => {
      const date = new Date(value);
      const today = new Date();
      if (date > today) {
        return "Birthdate must be in the past";
      }
    },
  },
  email: {
    required: "E-mail is a required field",
    pattern: {
      value:
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: "invalid email address",
    },
  },
  password: {
    required: "Password is a required field",
    minLength: { value: 8, message: "Password must be at least 8 characters" },
  },
  confirmPassword: {
    required: "Password is a required field",
    validate: (value) => {
      validationRules.password.value === value || "Passwords don't match";
    },
  },
  weight: {
    valueAsNumber: true,
    required: "Weight is a required field",
    min: { value: 0, message: "Weight must be greater than 0" },
    max: { value: 600, message: "Weight must be less than 600" },
  },

  height: {
    valueAsNumber: true,
    required: "Height is a required field",
    min: { value: 0, message: "Height must be greater than 0" },
    max: { value: 300, message: "Height must be less than 300" },
  },

  registerCheckBox: {
    required: "You must agree to the terms and conditions",
  },
};
