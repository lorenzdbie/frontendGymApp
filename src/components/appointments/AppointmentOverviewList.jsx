import { useCallback, useState, useEffect, memo } from "react";
import Appointment from "./Appointment";
import { useThemeColors } from "../../contexts/Theme.context";
import useAppointments from "../../api/appointments";
import Error from "../Error";
import Loader from "../Loader";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";



const localizer = momentLocalizer(moment);

export default memo(function AppointmentOverviewList() {
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
      const allEvents = fetchedAppointments.map((appointment) => {
        const name = `${appointment.id}\n\n ${appointment.user.firstName} ${appointment.user.lastName}\n\n ${appointment.training.name}`;
        return {
          id: appointment.id,
          title: name,
          start: new Date(appointment.startTime),
          end: new Date(appointment.endTime),
        };
      });
      setEvents(allEvents);
      console.log(fetchedAppointments);
      console.log(
        `events: ${allEvents.forEach((event) =>
          console.log(event.id, event.title, event.start, event.end)
        )}`
      );
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
        <Calendar
          localizer={localizer}
          min={new Date(0, 0, 0, 8, 0, 0)}
          max={new Date(0, 0, 0, 19, 15, 0)}
          defaultView="week"
          startAccessor="start"
          endAccessor="end"
          events={events}
          className={`calendar-${theme} btn-${theme}`}
          style={{ height: "70vh", maxWidth: "1200px", margin: "auto" }}
          // dayPropGetter={calendarStyle}
        />
      </div>
      <div className={`fullscreen bg-${theme} text-${oppositeTheme}`}>
        <h1 className="pt-5 text-center">Appointments</h1>
        <div className="landscape">
          <div className="d-flex flex-column mx-auto">
            <h2 className="text-center">Appointments overview</h2>
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
      </div>
    </>
  );

  // return (
  //   <div className={`fullscreen bg-${theme} text-${oppositeTheme}`}>
  //     <h1 className="pt-5 text-center">Appointments</h1>
  //     <div className="landscape">
  //       <div className="d-flex flex-column">
  //         <h2 className="text-center">Appointments overview</h2>
  //         <br />
  //         <h6 className="text-center"> Sorted by date:</h6>
  //         <div className="apbox">
  //           <Loader loading={loading} />
  //           <Error error={error} />
  //           {!loading && !error ? (
  //             <>
  //               {appointments
  //                 .sort((a, b) => new Date(a.date) - new Date(b.date))
  //                 .map((appoint) => (
  //                   <Appointment
  //                     key={appoint.id}
  //                     {...appoint}
  //                     onDelete={handleDelete}
  //                   />
  //                 ))}
  //             </>
  //           ) : null}
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
});
