const EXERCISE_DATA = [
  {
    id: 1,
    name: "Bench press",
    muscleGroup: "Chest",
    intensity: 3,
  },
  {
    id: 2,
    name: "Squat",
    muscleGroup: "Glutus Maximus, hamstring, quads",
    intensity: 4,
  },
  {
    id: 3,
    name: "Pull-up",
    muscleGroup: "lats",
    intensity: 3,
  },
  { id: 4, name: "Dumbell Curl", muscleGroup: "Biceps", intensity: 2 },
];

let APPOINTMENTS = [
  {
    id: 1,
    date: "2022-10-07T00:00:00.000Z",
    user: {
      id: 2,
      name: "Lorenz De Bie",
    },
    training: {
      id: 1,
      muscleGroup: "chest",
    },
    startTime: "2022-10-16T16:00:00.000Z",
    endTime: "2022-10-16T18:00:00.000Z",
    intensity: 3,
  },
  {
    id: 2,
    date: "2022-10-06T00:00:00.000Z",
    user: {
      id: 3,
      name: "Grietje",
    },
    training: {
      id: 2,
      muscleGroup: "legs",
    },
    startTime: "2022-10-18T08:00:00.000Z",
    endTime: "2022-10-18T10:00:00.000Z",
    intensity: 4,
  },
  {
    id: 3,
    date: "2022-10-05T00:00:00.000Z",
    user: {
      id: 1,
      name: "Galdino",
    },
    training: {
      id: 3,
      muscleGroup: "back",
    },
    startTime: "2022-10-12T10:00:00.000Z",
    endTime: "2022-10-12T14:00:00.000Z",
    intensity: 5,
  },
];

export { EXERCISE_DATA, APPOINTMENTS };
