import { useCallback, useState, useEffect } from "react";
import Appointment from "./Appointment";
import AppointmentForm from "./AppointmentForm";
import { useThemeColors } from "../../contexts/Theme.context";
import useAppointments from "../../api/appointments";
import Error from "../Error";
import Loader from "../Loader";
// import useUsers from "../../api/users";
import { Link } from "react-router-dom";

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
  // const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const appointmentsApi = useAppointments();
  // const userApi = useUsers();

  const refreshAppointments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedAppointments = await appointmentsApi.getAllForUser();
      setAppointments(fetchedAppointments);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  // const refreshUsers = useCallback(async () => {
  //   try {
  //     setError(null);
  //     const fetchedUsers = await userApi.getAll();
  //     setUsers(fetchedUsers);
  //   } catch (error) {
  //     console.error(error);
  //     setError(error);
  //   }
  // }, []);

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
      {error ? (
        <div className="d-flex mt-5 justify-content-center">
          <Link
            type="button"
            className={`btn btn-danger text-${oppositeTheme} d-flex align-items-center`}
            to={`/register`}
          >
            <h2 className="text-center">we need attitional user information</h2>
          </Link>
        </div>
      ) : (
        <>
          <h1 className="pt-5 text-center">Appointments</h1>
          <div className="landscape">
            <div className="formContainer">
              <AppointmentForm refreshAppointments={refreshAppointments} />
            </div>

            <div className="mobilehide">
              <h2 className="text-center">My Appointments:</h2>
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
                        />
                      ))}
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
