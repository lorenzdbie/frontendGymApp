// const EXERCISE_DATA = [
//   {
//     id: 1,
//     name: "Bench press",
//     muscleGroup: "Chest",
//   },
//   {
//     id: 2,
//     name: "legs",
//     muscleGroup: "Legs",
//   },
//   {
//     id: 3,
//     name: "Squat",
//     muscleGroup: "Glutus Maximus, hamstring, quads",
//   },
//   {
//     id: 4,
//     name: "Pull-up",
//     muscleGroup: "Back",
//   },
//   { id: 5, name: "Dumbell Curl", muscleGroup: "Biceps" },
// ];

// let APPOINTMENTS = [
//   {
//     id: 1,
//     date: "2022-10-07T00:00:00.000Z",
//     user: {
//       id: 2,
//       name: "Lorenz De Bie",
//     },
//     training: {
//       id: 1,
//       muscleGroup: "Chest",
//     },
//     startTime: "2022-10-16T16:00:00.000Z",
//     endTime: "2022-10-16T18:00:00.000Z",
//     intensity: 3,
//   },
//   {
//     id: 2,
//     date: "2022-10-06T00:00:00.000Z",
//     user: {
//       id: 3,
//       name: "Grietje",
//     },
//     training: {
//       id: 2,
//       muscleGroup: "Legs",
//     },
//     startTime: "2022-10-18T08:00:00.000Z",
//     endTime: "2022-10-18T10:00:00.000Z",
//     intensity: 4,
//   },
//   {
//     id: 3,
//     date: "2022-10-05T00:00:00.000Z",
//     user: {
//       id: 1,
//       name: "Galdino",
//     },
//     training: {
//       id: 4,
//       muscleGroup: "Back",
//     },
//     startTime: "2022-10-12T10:00:00.000Z",
//     endTime: "2022-10-12T14:00:00.000Z",
//     intensity: 5,
//   },
// ];

let TRAININGS = [
  {
    id: 1,
    name: "Bench press",
    muscleGroup: "Chest",
  },
  {
    id: 2,
    name: "legs",
    muscleGroup: "Legs",
  },
  {
    id: 3,
    name: "Squat",
    muscleGroup: "Glutus Maximus, hamstring, quads",
  },
  {
    id: 4,
    name: "Pull-up",
    muscleGroup: "Back",
  },
  {
    id: 5,
    name: "Dumbell Curl",
    muscleGroup: "Biceps",
  },
];

let APPOINTMENTS = [
  {
    id: 1,
    date: "2022-10-07T00:00:00.000Z",
    user: {
      id: 2,
      firstName: "Lorenz",
      lastName: "De Bie",
      // birthdate: "1988-12-12T00:00:00.000Z",
      // email: "lorenz.debie@hotmail.com",
      // weight: "83,0kg",
      // height: "1,87m",
      // credits: "5",
      // role: "user",
    },
    training: {
      id: 1,
      name: "Bench press",
      muscleGroup: "Chest",
    },
    startTime: "2022-10-16T16:00:00.000Z",
    endTime: "2022-10-16T18:00:00.000Z",
    intensity: 3,
    specialRequests: "",
  },
  {
    id: 2,
    date: "2022-10-06T00:00:00.000Z",
    user: {
      id: 3,
      firstName: "Grietje",
      lastName: "VC",
      // birthdate: "1978-04-17T00:00:00.000Z",
      // email: "grietje@gmail.com",
      // weight: "83,0kg",
      // height: "1,87m",
      // credits: "5",
      // rol: "user",
    },
    training: {
      id: 2,
      name: "legs",
      muscleGroup: "Legs",
    },
    startTime: "2022-10-18T08:00:00.000Z",
    endTime: "2022-10-18T10:00:00.000Z",
    intensity: 4,
    specialRequests: "",
  },
  {
    id: 3,
    date: "2022-10-05T00:00:00.000Z",
    user: {
      id: 1,
      firstName: "Galdino",
      lastName: "Noreillie",
      // birthdate: "1996-09-06T00:00:00.000Z",
      // email: "dino@hotmail.com",
      // weight: "90,0kg",
      // height: "1,87m",
      // credits: "10",
      // rol: "admin",
    },
    training: {
      id: 4,
      name: "Pull-up",
      muscleGroup: "Back",
    },
    startTime: "2022-10-12T10:00:00.000Z",
    endTime: "2022-10-12T14:00:00.000Z",
    intensity: 5,
    specialRequests: "",
  },
  {
    id: 4,
    date: "2022-10-15T00:00:00.000Z",
    user: {
      id: 4,
      firstName: "Geoffrey",
      lastName: "De Bie",
      // birthdate: "1990-10-31T00:00:00.000Z",
      // email: "geoffrey66@hotmail.com",
      // weight: "83,0kg",
      // height: "1,80m",
      // credits: "10",
      // rol: "admin",
    },
    training: {
      id: 5,
      name: "Dumbell Curl",
      muscleGroup: "Biceps",
    },
    startTime: "2022-10-15T17:30:00.000Z",
    endTime: "2022-10-15T19:00:00.000Z",
    intensity: 5,
    specialRequests: "",
  },
];


let USERS = [{
  id: 1,
  firstName: "Galdino",
  lastName: "Noreillie",
  birthdate: "1996-09-06T00:00:00.000Z",
  email: "dino@hotmail.com",
  weight: "90,0kg",
  height: "1,87m",
  credits: "10",
  rol: "admin",
}, 
{
  id: 2,
  firstName: "Lorenz",
  lastName: "De Bie",
  birthdate: "1988-12-12T00:00:00.000Z",
  email: "lorenz.debie@hotmail.com",
  weight: "83,0kg",
  height: "1,87m",
  credits: "5",
  role: "user",
},
{
  id: 3,
  firstName: "Grietje",
  lastName: "VC",
  birthdate: "1978-04-17T00:00:00.000Z",
  email: "grietje@gmail.com",
  weight: "83,0kg",
  height: "1,87m",
  credits: "5",
  rol: "user",
},
{
  id: 4,
  firstName: "Geoffrey",
  lastName: "De Bie",
  birthdate: "1990-10-31T00:00:00.000Z",
  email: "geoffrey66@hotmail.com",
  weight: "83,0kg",
  height: "1,80m",
  credits: "10",
  rol: "admin",
},
]

export { TRAININGS, APPOINTMENTS, USERS};

// export { EXERCISE_DATA, APPOINTMENTS };
