import { useAuth0 } from "@auth0/auth0-react";
import { useCallback } from "react";

export default function LoginButton() {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = useCallback(async () => 
    loginWithRedirect()
  , [loginWithRedirect]);

  return (
    <button
      type="button"
      className="btn btn-primary rounded-5"
      style={{ margin: "0 auto", backgroundColor: "blue" }}
      onClick={handleLogin}
    >
      Log In
    </button>
  );
}
