import { useAuth0 } from "@auth0/auth0-react";

export default function LogoutButton() {
  const { logout } = useAuth0();
  return (
    <button
      type="button"
      className="btn btn-primary rounded-5"
      style={{ margin: "0 auto", backgroundColor: "blue" }}
      onClick={() => logout({ returnTo: window.location.origin, })}
    >
      Log Out
    </button>
  );
}
