import { useCallback, useState, useEffect, memo } from "react";
import Afspraak from "/src/components/afspraken/Afspraak.jsx";
import { useThemeColors } from "/src/contexts/Theme.context.jsx";
import useAppointments from "/src/api/appointments.jsx";
import Error from "/src/components/Error.jsx";
import Loader from "/src/components/Loader.jsx";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment-timezone";

moment.tz.setDefault("Europe/Stockholm");
const localizer = momentLocalizer(moment);

//substract 1 hour from the date to get the correct time if daylight saving time is not active
export function substractHourForDST(date) {
  Date.prototype.stdTimezoneOffset = function () {
    var jan = new Date(this.getFullYear(), 0, 1);
    var jul = new Date(this.getFullYear(), 6, 1);
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
  };
  Date.prototype.isDstObserved = function () {
    return this.getTimezoneOffset() < this.stdTimezoneOffset();
  };

  if (date.isDstObserved()) {
    return date;
  } else {
    date.setTime(date.getTime() - 1 * 60 * 60 * 1000);
    return date;
  }
}

export default function AfsprakenOverviewList() {
  const { theme, oppositeTheme } = useThemeColors();
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const appointmentsApi = useAppointments();
  const [events, setEvents] = useState([]);

  const refreshAppointments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedAppointments = await appointmentsApi.getAll();
      setAppointments(fetchedAppointments);
      // console.log(fetchedAppointments);
      const allEvents = fetchedAppointments
        .filter(
          (appointment) =>
            substractHourForDST(new Date(appointment.endTime)) > new Date()
        )
        .map((appointment) => {
          const name =
            `${appointment.user.firstName} ${appointment.user.lastName}` +
            " : " +
            `${appointment.training.name}`;
          return {
            id: appointment.id,
            title: name,
            start: substractHourForDST(new Date(appointment.startTime)),
            end: substractHourForDST(new Date(appointment.endTime)),
          };
        });
      setEvents(allEvents);
      // console.log(fetchedAppointments);
      // console.log(
      //   `events: ${allEvents.forEach((event) =>
      //     console.log(event.id, event.title, event.start, event.end)
      //   )}`
      // );
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
      // console.log("onDeleteConfirm", idToDelete);
      setAppointments((appointments) =>
        appointments.filter(({ id }) => id !== idToDelete)
      );
      setEvents((events) => events.filter(({ id }) => id !== idToDelete));
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
        {!loading && !error ? (
          <Calendar
            localizer={localizer}
            min={substractHourForDST(new Date(0, 0, 0, 8, 0, 0))}
            max={substractHourForDST(new Date(0, 0, 0, 19, 15, 0))}
            defaultView="week"
            startAccessor="start"
            endAccessor="end"
            events={events}
            className={`calendar-${theme} btn-${theme}`}
            style={{ height: "70vh", maxWidth: "1200px", margin: "auto" }}
          />
        ) : null}
      </div>
      <div className={`fullscreen bg-${theme} text-${oppositeTheme}`}>
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
                    .sort((a, b) => new Date(a.startTime) - new Date(b.startTime)).filter(
                      (appointment) =>
                        substractHourForDST(new Date(appointment.endTime)) > new Date()
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
      </div>
    </>
  );
}
