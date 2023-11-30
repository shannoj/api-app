import { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import RenderArtists from "./components/RenderArtists";
import SearchForm from "./components/SearchForm";

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

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchKey(e.target.value);
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

    setArtists(data.artists.items);
  };

  return (
    <>
      <div className="App">
        <header className="App-header"></header>
        {!token ? (
          <a
            href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
          >
            Login to Spotify
          </a>
        ) : (
          <button onClick={logout}>Logout</button>
        )}
        <SearchForm
          setSearchKey={handleSearch}
          searchArtists={searchArtists}
        ></SearchForm>
        <RenderArtists artists={artists}></RenderArtists>
      </div>
    </>
  );
}

export default App;
