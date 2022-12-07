import "./App.css";
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
import Navbar from "./components/Navbar";
import Login from "./components/users/Login";
import Register from "./components/users/Register";
import AppointmentList from "./components/appointments/appointmentList";
// import AppointmentOverviewList from "./components/appointments/appointmentOverviewList";
import ExerciseList from "./components/exercises/ExerciseList";
import UserList from "./components/users/UserList";
import useUsers from "./api/users";
import NotFound from "./components/NotFound";
import { useThemeColors } from "./contexts/Theme.context";
import RequireAuth from "./components/authentication/requireAuth";
import AuthLanding from "./components/authentication/AuthLanding";


function App() {
  const { theme, oppositeTheme } = useThemeColors();

  return (
      <div className={`bg-${theme} text-${oppositeTheme}`}>
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
              <Route path="/appointments">
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
                {/* <Route
                  path="overview"
                  element={
                    <RequireAuth>
                      <AppointmentOverviewList />
                    </RequireAuth>
                  }
                /> */}
              </Route>
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
