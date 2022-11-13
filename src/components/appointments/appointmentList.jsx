import { TRAININGS, USERS } from "../../api/mock-data";
// import { APPOINTMENTS } from "../../api/mock-data";
import { useCallback, useState, useEffect } from "react";
import Appointment from "./Appointment";
import AppointmentForm from "./AppointmentForm";
import { useThemeColors } from "../../contexts/Theme.context";
import * as appointmentsApi from "../../api/appointments.js";
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
  //   updateToDateObject(APPOINTMENTS, "date")
  // );

  // const [appointments, setAppointments] = useState(APPOINTMENTS);

  useEffect(() => {
    const fetchAppointments = async () => {
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
      }
      console.log(appointments);
    };
    fetchAppointments();
  }, []);

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

  console.log(...appointments);

  const createAppointment = (
    email,
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
          id: Number(USERS.filter((e) => e.email === email).map((e) => e.id)),
          firstName: String(
            USERS.filter((e) => e.email === email).map((e) => e.firstName)
          ),
          lastName: String(
            USERS.filter((e) => e.email === email).map((e) => e.lastName)
          ),
          email,
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
    <div className={`fullscreen bg-${theme} text-${oppositeTheme}`}>
      <h1 className="pt-5 text-center">Appointments</h1>
      <div className="landscape">
        <div className="formContainer">
          <AppointmentForm onSaveAppointment={createAppointment} />
        </div>

        <div className="mobilehide">
          <h2 className="text-center">Appointment List</h2>
          <br />
          <h6 className="text-center"> Sorted by ID:</h6>
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
                      index={appoint.id}
                      onDelete={handleDelete}
                      {...appoint}
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
