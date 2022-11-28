import { Auth0Provider } from "@auth0/auth0-react";

const MyAuth0Provider = ({ children }) => {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={`${window.location.origin}/appointments`}
      cacheLocation="localstorage"
    >
      {children}
    </Auth0Provider>
  );
};

export default MyAuth0Provider;
