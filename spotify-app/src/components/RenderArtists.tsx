import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

interface Artist {
  id: string;
  name: string;
  popularity: string;
  genres: Array<string>;
  images: { url: string }[];
}

interface renderArtistProps {
  artists: Array<any>;
}

const RenderArtists = ({ artists }: renderArtistProps) => {

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

  return (
    <Grid container spacing={2}>
      {artists.map((artist: Artist) => (
        <Grid item xs={4} key={artist.id}>
          <Card raised={true} sx={{ maxWidth: 345, margin: 2 }}>
            <CardMedia
              sx={{ height: 140 }}
              image={
                artist.images && artist.images[0] && artist.images[0].url
                  ? artist.images[0].url
                  : "https://img.icons8.com/ios-filled/50/no-image.png"
              }
            ></CardMedia>
            <CardContent>
              <Typography>{artist.name}</Typography>
            </CardContent>
            <CardContent>
              <Typography>Popularity: {artist.popularity}</Typography>
            </CardContent>
            <CardContent
              sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
            >
              {artist.genres.map((genre, index) => (
                <Typography key={index} sx={{}}>
                  {capitalizeFirstLetter(genre)}
                  {(index+1) !== (artist.genres.length) && ","}
                  &nbsp;
                </Typography>
              ))}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default RenderArtists;
