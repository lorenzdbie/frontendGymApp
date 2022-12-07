import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "/src/components/authentication/LoginButton.jsx";
import LogoutButton from "/src/components/authentication/LogoutButton.jsx";

export default function AuthenticationButton() {
  const { isAuthenticated, user } = useAuth0();

  if (isAuthenticated) {
    const { name, picture, givenName } = user;
    return (
      <div className="d-flex flex-row align-items-center">
        <div className="col">
          <img
            src={picture}
            alt={givenName}
            className="rounded-5"
            style={{ width: "40px", height: "40px" }}
          />
        </div>
        <div className="col mr-2">{name} {givenName}</div>
        <div className="col mx-2">
          <LogoutButton />
        </div>
      </div>
    );
  }
  return <LoginButton />;
}
