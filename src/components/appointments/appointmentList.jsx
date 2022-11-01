import { APPOINTMENTS, TRAININGS, USERS } from "../../api/mock-data";
import { useCallback, useState } from "react";
import Appointment from "./appointment";
import AppointmentForm from "./appointmentForm"; 




export const updateToDateObject = (list, ...dateProps) => {
  return list.map((entry) => {
    for(const prop of dateProps) {
      entry[prop] = new Date(entry[prop]);
    }return entry;
  });
};

export default function AppointmentList() {
  const [appointments, setAppointments] = useState(
    updateToDateObject(APPOINTMENTS, "date")
  );
  // const [appointments, setAppointments] = useState(APPOINTMENTS);

  const handleDelete = (id) => {
    console.log("onDeleteConfirm", id);
    const newAppointments = appointments.filter((e) => e.id !== id);
    setAppointments(newAppointments);
  };

  console.log(...appointments);

  const createAppointment = (
    firstName,
    lastName,
    date,
    trainingName,
    startTime,
    endTime,
    intensity,
    specialRequest
  ) => {
    const fName = firstName.toLowerCase();
    const lName = lastName.toLowerCase();
    const newAppointments = [
      {
        id: Number(Math.max(...appointments.map((e) => e.id)) + 1),
        date: new Date(date),
        user: {
          // id: Number(
          //   USERS.includes((a) => {
          //     a.firstName.toLowerCase() === firstName.toLowerCase() &&
          //       a.lastName.toLowerCase() === lastName.tolowerCase();
          //   })
          //     ? USERS.filter((a) => {
          //         a.firstName.toLowerCase() === firstName.tolowerCase() &&
          //           a.lastName.toLowerCase() === lastName.tolowerCase();
          //       }).id
          //     : Math.max(...USERS.map((e) => e.id)) + 1
          // ),
          id: Number(
            // USERS.map((u) => u.firstName).includes(firstName) &&
            //   USERS.map((u) => u.lastName).includes(lastName)

            USERS.map((user) => {
              user.firstName.toLowerCase(), user.lastName.toLowerCase();
            }).includes({ fName, lName })
              ? USERS.filter((a) => {
                  a.firstName.toLowerCase() === fName &&
                    a.lastName.toLowerCase() === lName;
                }).id
              : Math.max(...USERS.map((e) => e.id)) + 1
          ),
          firstName,
          lastName,
        },
        training: {
          id: Number(
            TRAININGS.filter((e) => e.name === trainingName).map((e) => e.id)
          ),
          name: trainingName,
          muscleGroup: String(
            TRAININGS.filter((e) => e.name === trainingName).map(
              (e) => e.muscleGroup
            )
          ),
        },
        startTime,
        endTime,
        intensity,
        specialRequest,
      },
      ...appointments,
    ];

    setAppointments(newAppointments);
    console.log("appointments", JSON.stringify(appointments));
    console.log("newAppointments", JSON.stringify(newAppointments));
  };

  return (
    <>
      <h1 className="mt-5 text-center">Appointments</h1>
      <div className="landscape">
        <div className="formContainer">
          <AppointmentForm onSaveAppointment={createAppointment} />
        </div>

        <div className="mobilehide">
          <h2>Appointment List</h2>
          <br />
          <h6> Sorted by ID:</h6>
          <div className="apbox">
            {appointments
              .sort((a, b) => new Date(a.date) - new Date(b.date))
              .map((appoint) => (
                <Appointment
                  {...appoint}
                  key={appoint.id}
                  index={appoint.id}
                  onDelete={handleDelete}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
