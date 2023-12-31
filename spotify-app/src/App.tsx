import { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import RenderArtists from "./components/RenderArtists";
import SearchForm from "./components/SearchForm";
import LoginLogout from "./components/LoginLogout";
import AppBar from "@mui/material/AppBar";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { Button, Toolbar, Typography } from "@mui/material";

interface Artist {
  // Define the structure of the artist object based on the Spotify API response
  // For example:
  id: string;
  name: string;
  // ... other properties
}

function App() {
  const CLIENT_ID = "df46d308b60c4450b79230ccbba9d779";
  const REDIRECT_URI = "http://localhost:5173/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState<string | null>("");

  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const hash = window.location ? window.location.hash : "";
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token =
        hash
          .substring(1)
          .split("&")
          .find((elem) => elem.startsWith("access_token"))
          ?.split("=")[1] ?? "";

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);
  }, []);

  const handleSearch = async (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let search = e.target.value.toLowerCase();
    setSearchKey(search);
    setLoading(true);
    try {
      const { data } = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          q: searchKey,
          type: "artist",
        },
      });
      const filteredResults = data.artists.items.filter((result: Artist) =>
        result.name.toLowerCase().startsWith(search)
      );
      setArtists(filteredResults);
      console.log(filteredResults);
      setLoading(false);
      setError("");
    } catch (error) {
      setError("Error fetching data. Please try again.");
      setLoading(false);
    }
  };

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  return (
    <>
      <div className="App">
        <header className="App-header"></header>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar
            position="static"
            color="secondary"
            sx={{
              backgroundColor: "#4CAF50",
            }}
          >
            <Toolbar>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
              >
                Search Spotify Artists App
              </Typography>
              {!token ? (
                <Button
                  variant="contained"
                  href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
                >
                  Login
                </Button>
              ) : (
                <>
                  <SearchForm setSearchKey={handleSearch}></SearchForm>
                  <LoginLogout logout={logout}></LoginLogout>
                </>
              )}
            </Toolbar>
          </AppBar>
        </Box>
        {loading ? (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        ) : (
          <RenderArtists artists={artists}></RenderArtists>
        )}
        {error && <Alert severity="error">error loading</Alert>}
      </div>
    </>
  );
}

export default App;
