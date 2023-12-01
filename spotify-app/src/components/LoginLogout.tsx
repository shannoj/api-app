import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

interface LoginLogoutProps {
  logout: () => void;
}

const LoginLogout = ({ logout }: LoginLogoutProps) => {
  return (
    <>
      <Button variant="contained" onClick={logout} sx={{ marginLeft: 2 }}>
        <Typography>Logout</Typography>
      </Button>
    </>
  );
};

export default LoginLogout;
