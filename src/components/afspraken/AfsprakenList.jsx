import { useCallback, useState, useEffect } from "react";
import Afspraak from "/src/components/afspraken/Afspraak.jsx";
import AfspraakForm from "./AfspraakForm";
import { useThemeColors } from "/src/contexts/Theme.context.jsx";
import useAppointments from "/src/api/appointments.jsx";
import Error from "/src/components/Error.jsx";
import Loader from "/src/components/Loader.jsx";
import useUsers from "/src/api/users.jsx";
import { Link } from "react-router-dom";
import { substractHourForDST } from "./AfspraakOverviewList";

//renders an appointmentform and a list of appointments for a specific user
export default function AfsprakenList() {
  
  const { theme, oppositeTheme } = useThemeColors();
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const appointmentsApi = useAppointments();
  const [userId, setUserId] = useState(null);
  const userApi = useUsers();

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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const user = await userApi.getUserByAuthId();
        const id = user.id;
        setUserId(id);
      } catch (error) {
        setError(error);
      }finally{
        setLoading(false);
      }
    };
    refreshAppointments();
    fetchUsers();
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
      {!loading && !error && !userId ? (
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
              <AfspraakForm refreshAppointments={refreshAppointments} />
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
                      .filter(
                        (appointment) =>
                          substractHourForDST(new Date(appointment.endTime)) >
                          new Date()
                      )
                      .map((appoint) => (
                        <Afspraak
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
