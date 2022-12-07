import { useCallback, useState, useEffect, memo } from "react";
import Afspraak from "/src/components/afspraken/Afspraak.jsx";
import { useThemeColors } from "/src/contexts/Theme.context.jsx";
import useAppointments from "/src/api/appointments.jsx";
import Error from "/src/components/Error.jsx";
import Loader from "/src/components/Loader.jsx";

export default function AfsprakenOverviewList() {
  const { theme, oppositeTheme } = useThemeColors();
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const appointmentsApi = useAppointments();

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
    }
  }, []);

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
    <>
      <div className={` mt-5 mx-5 pb-5`}>
        <h1 className="py-2 text-center">Appointments</h1>
        <Loader loading={loading} />
        <Error error={error} />
      
      </div>
      <div className={`fullscreen bg-${theme} text-${oppositeTheme}`}>
        {/* <h1 className="pt-5 text-center">Appointments</h1> */}
        <div className="landscape">
          <div className="d-flex flex-column mx-auto">
            <h2 className="text-center">Appointment overview: </h2>
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
      </div>
    </>
  );
 };
 
