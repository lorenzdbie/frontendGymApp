import { APPOINTMENTS } from "../../api/mock-data";
import { useState } from "react";
import Appointment from "./appointment";
import AppointmentForm from "./appointmentForm";

export default function AppointmentList() {
  const [appointments, setAppointments] = useState(APPOINTMENTS);


  const createAppointment = (
    name,
    date,
    muscleGroup,
    startTime,
    endTime,
    intensity
  ) => {
    const newAppointments = [
      {
        id: Math.max(appointments.map((e) => e.id)) + 1,
        date: new Date(date),
        user: {
          id: appointments.includes((a) => a.user.name === name)
            ? appointments.filter((e) => (e.user.name = name)).map((e) => e.id)
            : Math.max(appointments.map((e) => e.user.id)) + 1,
          name: name,
        },
        training: {
          id: appointments.filter(
            (e) => (e.training.muscleGroup === muscleGroup)
          ).map((e) => e.training.id),
          muscleGroup,
        },
        startTime,
        endTime,
        intensity,
      },
      ...appointments,
    ];

    setAppointments(newAppointments);
    console.log("appointments", JSON.stringify(appointments));
    console.log("newAppointments", JSON.stringify(newAppointments));
  };
  return (
    <>
      <h1>Appointments</h1>
      <AppointmentForm onSaveAppointment={createAppointment} />
      {appointments.map((appoint) => (
        <Appointment {...appoint} key={appoint.id} index={appoint.id}/>
      ))}
    </>
  );
}
