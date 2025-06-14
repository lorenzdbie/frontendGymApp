import "/src/App.css";
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "/src/components/Navbar.jsx";
import Login from "/src/components/users/Login.jsx";
import Register from "/src/components/users/Register.jsx";
import AfsprakenList from "/src/components/afspraken/AfsprakenList.jsx";
import AfspraakOverviewList from "/src/components/afspraken/AfspraakOverviewList.jsx";
import ExerciseList from "/src/components/exercises/ExerciseList.jsx";
import UserList from "/src/components/users/UserList.jsx";
import { useThemeColors } from "/src/contexts/Theme.context.jsx";
import RequireAuth from "/src/components/authentication/RequireAuth.jsx";

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
                <AfsprakenList />
              </RequireAuth>
            }
          />
          <Route
            path="add"
            element={
              <RequireAuth>
                <AfsprakenList />
              </RequireAuth>
            }
          />
          <Route
            path="edit/:id"
            element={
              <RequireAuth>
                <AfsprakenList />
              </RequireAuth>
            }
          />

          <Route
            path="overview"
            element={
              <RequireAuth>
                <AfspraakOverviewList />
              </RequireAuth>
            }
          />
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
