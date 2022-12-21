import { Auth0Provider } from "@auth0/auth0-react";

const MyAuth0Provider = ({ children }) => {
  const domain = import.meta.env.VITE_API_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_API_AUTH0_CLIENT_ID;
  const audience = import.meta.env.VITE_API_AUTH0_API_AUDIENCE;

  return (
    <Auth0Provider
      domain={domain}
      audience={audience}
      clientId={clientId}
      redirectUri={`${window.location.origin}/appointments`}
      useRefreshTokens
      cacheLocation="localstorage"
    >
      {children}
    </Auth0Provider>
  );
};

export default MyAuth0Provider;
