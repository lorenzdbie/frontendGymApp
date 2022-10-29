import { APPOINTMENTS, TRAININGS, USERS } from "../../api/mock-data";
import { useState } from "react";
import Appointment from "./appointment";
import AppointmentForm from "./appointmentForm";

export default function AppointmentList() {
  const [appointments, setAppointments] = useState(APPOINTMENTS);

  const onDeleteConfirm = (id) => {
    console.log("onDeleteConfirm", id);
    const newAppointments = appointments.filter((e) => e.id !== id);
    setAppointments(newAppointments);
  };

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
    const newAppointments = [
      {
        id: Number(Math.max(...appointments.map((e) => e.id)) + 1),
        date: new Date(date),
        user: {
          id: Number(
            USERS.includes((a) => {
              a.firstName.toLowerCase() === firstName.toLowerCase() &&
                a.lastName.toLowerCase() === lastName.tolowerCase();
            })
              ? USERS.filter((a) => {
                  a.firstName.toLowerCase() === firstName.tolowerCase() &&
                    a.lastName.toLowerCase() === lastName.tolowerCase();
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
    // const ragnar = appointments.filter(x => x.user.firstName === 'Ragnar')
    //    console.log(ragnar);
  };

  return (
    <>
      <div className="col-sm-11 ">
        <h1>Appointments</h1>
        <br />
        <AppointmentForm onSaveAppointment={createAppointment} />
      </div>
      <div>
        Sorted by date:
        <div style={{ width: "350px" }}>
          {appointments
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .map((appoint) => (
              <Appointment
                className="appointment_box"
                {...appoint}
                key={appoint.id}
                index={appoint.id}
                onDelete={onDeleteConfirm}
              />
            ))}
        </div>
      </div>
    </>
  );
}
