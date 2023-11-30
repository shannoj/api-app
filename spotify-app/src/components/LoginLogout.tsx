import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

interface LoginLogoutProps {
  token: string | null;
  AUTH_ENDPOINT: string;
  CLIENT_ID: string;
  REDIRECT_URI: string;
  RESPONSE_TYPE: string;
  logout: () => void;
}

const LoginLogout = ({
  token,
  AUTH_ENDPOINT,
  CLIENT_ID,
  REDIRECT_URI,
  RESPONSE_TYPE,
  logout,
}: LoginLogoutProps) => {
  return (
    <>
      {!token ? (
        <Link
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
        >
          Login to Spotify
        </Link>
      ) : (
        <Button onClick={logout}>Logout</Button>
      )}
    </>
  );
};

export default LoginLogout;
