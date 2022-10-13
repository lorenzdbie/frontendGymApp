import { APPOINTMENTS } from "../../api/mock-data";
import { useState } from "react";
import Appointment from "./appointment";
import AppointmentForm from "./appointmentForm";

export default function AppointmentList() {
  const [appointments, setAppointments] = useState(APPOINTMENTS);

  const createAppointment = (
    user,
    date,
    training,
    startTime,
    endTime,
    intensity
  ) => {
    const newAppointments = [
      {
        user,
        date: new Date(date),
        training,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
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
      {appointments.map((appoint) => {
        <Appointment {...appoint} key={appoint.id} />;
      })}
    </>
  );
}

// export default function TransactionList() {
//   const [transactions, setTransactions] = useState(TRANSACTION_DATA);

//   const createTransaction = (user, place, amount, date) => {
//     const newTransactions = [
//       {
//         user,
//         place,
//         amount,
//         date: new Date(date),
//       },
//       ...transactions,
//     ];
//     setTransactions(newTransactions);
//     console.log("transactions", JSON.stringify(transactions));
//     console.log("newTransactions", JSON.stringify(newTransactions));
//   };

//   return (
//     <>
//       <h1>Transactions</h1>
//       <TransactionForm onSaveTransaction={createTransaction} />
//       {transactions.map((trans, index) => (
//         <Transaction
//           {...trans}
//           key={index}
//           //user={trans.user}
//           //amount={trans.amount}
//           //place={trans.place}
//         />
//       ))}
//     </>
//   );
// }
