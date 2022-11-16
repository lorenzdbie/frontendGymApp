import { TRAININGS, USERS } from "../../api/mock-data";
// import { APPOINTMENTS } from "../../api/mock-data";
import { useCallback, useState, useEffect } from "react";
import Appointment from "./Appointment";
import AppointmentForm from "./AppointmentForm";
import { useThemeColors } from "../../contexts/Theme.context";
import * as appointmentsApi from "../../api/appointments";
import Error from "../Error";
import Loader from "../Loader";

export const updateToDateObject = (list, ...dateProps) => {
  return list.map((entry) => {
    for (const prop of dateProps) {
      entry[prop] = new Date(entry[prop]);
    }
    return entry;
  });
};

export default function AppointmentList() {
  const { theme, oppositeTheme } = useThemeColors();
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshAppointments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedAppointments = await appointmentsApi.getAll();
      setAppointments(fetchedAppointments);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
      console.log("start:", appointments);
    }
  }, []);

  // const setAppointmentToUpdate = useCallback(
  //   (id) => {
  //     // console.log("setting appointment to update with id: ", id);
  //     // console.log("type of id: ", typeof id);
  //     // console.log("value of appointments[0]: ", appointments[0]);
  //     // for (let i = 0; i < appointments.length; i++) {
  //     //   if (appointments[i].id === id) {
  //     //     console.log(appointments[i]);
  //     //     const selectedAppointment = appointments[i];
  //     //     setCurrentAppointment({selectedAppointment});
  //     //     console.log("currentAppointment: ", currentAppointment);
  //     //     break;
  //     //   }
  //     // }
  //     const selectedAppointment = appointments.find(
  //       (appointment) => appointment.id === id
  //     );
  //     // console.log("selectedAppointment: ", selectedAppointment);
  //     setCurrentAppointment(selectedAppointment);
  //     // console.log("currentAppointment: ", currentAppointment);

  //     // console.log("appointments: ", appointments);
  //     // console.log("currentAppointment: ", currentAppointment);
  //     // console.log(`Current Appointment with id ${id} is set`);
  //     // console.log({ ...currentAppointment });
  //   },
  //   [appointments]
  // );

  useEffect(() => {
    refreshAppointments();

  }, [refreshAppointments]);

  const handleDelete = useCallback(async (idToDelete) => {
    try {
      setError(null);
      await appointmentsApi.deleteById(idToDelete);
      console.log("onDeleteConfirm", idToDelete);
      setAppointments((appointments) =>
        appointments.filter(({ id }) => id !== idToDelete)
      );
    } catch (error) {
      console.error(error);
      setError(error);
    }
  }, []);


  return (
    <div className={`fullscreen bg-${theme} text-${oppositeTheme}`}>
      <h1 className="pt-5 text-center">Appointments</h1>
      <div className="landscape">
        <div className="formContainer">
          <AppointmentForm refreshAppointments={refreshAppointments} />
        </div>

        <div className="mobilehide">
          <h2 className="text-center">Appointment List</h2>
          <br />
          <h6 className="text-center"> Sorted by date:</h6>
          <div className="apbox">
            <Loader loading={loading} />
            <Error error={error} />
            {!loading && !error ? (
              <>
                {appointments
                  .sort((a, b) => new Date(a.date) - new Date(b.date))
                  .map((appoint) => (
                    <Appointment
                      key={appoint.id}
                      {...appoint}
                      onDelete={handleDelete}
                      // onEdit={setAppointmentToUpdate}
                    />
                  ))}
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
