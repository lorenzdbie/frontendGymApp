import "/src/App.css";
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// import { useState, useCallback, useEffect } from "react";
import Navbar from "/src/components/Navbar.jsx";
import Login from "/src/components/users/Login.jsx";
import Register from "/src/components/users/Register.jsx";
// import AppointmentList from "/src/components/appointments/AppointmentList.jsx";
// import AppointmentOverviewList from "/src/components/appointments/AppointmentOverviewList.jsx";
// import Appointment from "/src/components/appointments/Appointment.jsx";
import Afspraak from "/src/components/afspraken/Afspraak.jsx";
import ExerciseList from "/src/components/exercises/ExerciseList.jsx";
import UserList from "/src/components/users/UserList.jsx";
import { useThemeColors } from "/src/contexts/Theme.context.jsx";
import RequireAuth from "/src/components/authentication/RequireAuth.jsx";

function App() {
  const { theme, oppositeTheme } = useThemeColors();

  return (
    <div className={`bg-${theme} text-${oppositeTheme}`}>
      <Afspraak />
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate replace to="/Login" />} />
        <Route path="/register">
          <Route
            index
            element={
              <RequireAuth>
                <Register />
              </RequireAuth>
            }
          />
        </Route>

        {/* <Route path="/appointments">
          <Route
            index
            element={
              <RequireAuth>
                <AppointmentList />
              </RequireAuth>
            }
          />
          <Route
            path="add"
            element={
              <RequireAuth>
                <AppointmentList />
              </RequireAuth>
            }
          />
          <Route
            path="edit/:id"
            element={
              <RequireAuth>
                <AppointmentList />
              </RequireAuth>
            }
          />

           <Route
                  path="overview"
                  element={
                    <RequireAuth>
                      <AppointmentOverviewList />
                    </RequireAuth>
                  }
                />
        </Route> */}
        {/* <Route path="/overview">
          <Route
            index
            element={
              <RequireAuth>
                <AppointmentOverviewList />
              </RequireAuth>
            }
          />
        </Route> */}

        <Route path="/exercises">
          <Route
            index
            element={
              <RequireAuth>
                <ExerciseList />
              </RequireAuth>
            }
          />
          <Route
            path="add"
            element={
              <RequireAuth>
                <ExerciseList />
              </RequireAuth>
            }
          />
          <Route
            path="edit/:id"
            element={
              <RequireAuth>
                <ExerciseList />
              </RequireAuth>
            }
          />
        </Route>
        <Route path="/users">
          <Route
            index
            element={
              <RequireAuth>
                <UserList />
              </RequireAuth>
            }
          />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}
export default App;
