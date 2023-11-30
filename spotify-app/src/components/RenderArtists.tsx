import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

interface Artist {
  id: string;
  name: string;
  images: { url: string }[];
}

interface renderArtistProps {
  artists: Array<any>;
}

const RenderArtists = ({ artists }: renderArtistProps) => {
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
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default RenderArtists;
