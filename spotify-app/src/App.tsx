import { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import RenderArtists from "./components/RenderArtists";
import SearchForm from "./components/SearchForm";
import LoginLogout from "./components/LoginLogout";
import AppBar from "@mui/material/AppBar";

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
  };

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  const searchArtists = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchKey,
        type: "artist",
      },
    });
    console.log(data);
    setArtists(data.artists.items);
  };

  return (
    <>
      <div className="App">
        <header className="App-header"></header>
        <AppBar
          position="static"
          color="secondary"
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <SearchForm
            setSearchKey={handleSearch}
            searchArtists={searchArtists}
          ></SearchForm>
          <LoginLogout
            token={token}
            CLIENT_ID={CLIENT_ID}
            AUTH_ENDPOINT={AUTH_ENDPOINT}
            REDIRECT_URI={REDIRECT_URI}
            RESPONSE_TYPE={RESPONSE_TYPE}
            logout={logout}
          ></LoginLogout>
        </AppBar>
        <RenderArtists artists={artists}></RenderArtists>
      </div>
    </>
  );
}

export default App;
